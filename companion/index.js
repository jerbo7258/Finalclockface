import * as messaging from "messaging";
import { geolocation } from "geolocation";
import { settingsStorage } from "settings";



var API_KEY = "076ffcb44db669ea4d5fa378d7b2df19";

// Fetch the weather from OpenWeather
function queryOpenWeather() {
  geolocation.getCurrentPosition(locationSuccess, locationError);
  function locationSuccess(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    console.log("latitude: " + lat);
    console.log("langitude: " + long);
    var linkApi = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="  + long + "&units=metric" + "&APPID=" + API_KEY + "&units=imperial";
  fetch(linkApi)
  .then(function (response) {
      response.json()
      .then(function(data) {
        // We just want some data
        var weather = {
          key: "weather",
            temperature: data.main.temp,
             meteo: data.weather[0].main, 
             location: data["name"]
        }
        // Send the weather data to the device
        returnWeatherData(weather);
      });
  })
  .catch(function (err) {
    console.log("Error fetching weather: " + err);
  });
 };
 function locationError(error) {
  console.log("Error: " + error.code,
              "Message: " + error.message);
}
}

// Send the weather data to the device
function returnWeatherData(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the device
    messaging.peerSocket.send(data);
  } else {
    console.log("Error: Connection is not open");
  }
}

// Listen for messages from the device
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data && evt.data.command == "weather") {
    // The device requested weather data
    queryOpenWeather();
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}


// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("Companion Socket Open");
  restoreSettings();
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("Companion Socket Closed");
};

// A user changes settings
settingsStorage.onchange = evt => {
  let data = {
    key: evt.key,
    newValue: evt.newValue
  };
  sendVal(data);
};

// Restore any previously saved settings and send to the device
function restoreSettings() {
  for (let index = 0; index < settingsStorage.length; index++) {
    let key = settingsStorage.key(index);
    if (key) {
      let data = {
        key: key,
        newValue: settingsStorage.getItem(key)
      };
      sendVal(data);
    }
  }
}

// Send data to device using Messaging API
function sendVal(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}