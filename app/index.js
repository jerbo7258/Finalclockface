import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { days, months, monthsShort } from "../common/en.js";
import {hrtRM} from "../common/heartRate.js";
import { battery } from "power";
import { me as appbit } from "appbit";
import { today } from 'user-activity';
import { units } from "user-settings";
import { geolocation } from "geolocation";
import * as messaging from "messaging";



// Update the clock every minute
clock.granularity = "seconds";
let stepsTaken = 0;

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
//const dateLabel = document.getElementById("dateLabel");
const hrmLabel = document.getElementById("heartRate");
const batteryLabel = document.getElementById("battery");
const stepsTakenLabel = document.getElementById("stepsTaken");
let hr = hrtRM;

let back = document.getElementById("background");

let batt = document.getElementById("batt");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let currMonth = monthsShort[today.getMonth()];
  let currDay = days[today.getDay()];
  let currDayNum = util.zeroPad(today.getDate());
  
  dateLabel.text = `${currDay} ${currMonth} ${currDayNum}`;
    
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
 
  

}

function batteryChange(){
let batteryPercent = (Math.floor(battery.chargeLevel) + "%");

  batteryLabel.text = `${batteryPercent}`;
}
batteryChange();
setInterval(batteryChange,3000);


function hearRateChange(){
  let hr = hrtRM;
  hrmLabel.text = `${hr}`;

}
hearRateChange();
setInterval(hearRateChange,5000);
 
function getSteps(){
  if(appbit.permissions.granted("access_activity")){

   stepsTaken = today.adjusted.steps;
  }


  let numSteps = stepsTaken;
  stepsTakenLabel.text =  `${numSteps}`;
}
getSteps();
setInterval(getSteps,5000);

const clockPref = preferences.clockDisplay;

// Import measure units 
const measureUnitsPref = units.distance;

// Set clock granularity (minutes or seconds)
clock.granularity = "minutes";

// Get a handle on the <text> element
const timeHandle = document.getElementById("timeLabel");
const temperatureHandle = document.getElementById("temperatureLabel");
const meteoHandle = document.getElementById("meteoLabel");
const locationHandle = document.getElementById("locationLabel");
const dateLabel = document.getElementById("dateLabel");


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let today = evt.date;
  let hours = today.getHours();
  let hoursSuffix;


  let currMonth = monthsShort[today.getMonth()];
  let currDay = days[today.getDay()];
  let currDayNum = util.zeroPad(today.getDate());


  
  dateLabel.text = `${currDay} ${currMonth} ${currDayNum}`;
  
  if (hours > 12) {hoursSuffix = " pm"} else {hoursSuffix = " am"};
  if (clockPref === "12h") {
    // 12h format
    hours = hours % 12 || 12;
    console.log(hours);
  } else {
    // 24h format
    hours = util.zeroPad(hours);
    hoursSuffix = "";
  }
  let mins = util.zeroPad(today.getMinutes());
  timeHandle.text = `${hours}:${mins} ${hoursSuffix}`;
}

// Weather module

// Request weather data from the companion
function fetchWeather() {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send a command to the companion
    messaging.peerSocket.send({
      command: 'weather'
    });
  }
}

// Display the weather data received from the companion
function processWeatherData(data) {
  if (measureUnitsPref === "us ") {
    
    temperatureHandle.text = ((data.temperature * 9 / 5) +32) + " °F";
  }
  // else {
  //   temperatureHandle.text = data.temperature + " °C";
  // }
 
   temperatureHandle.text = Math.round(((data.temperature * 9 / 5) +32)) + " °F";
  meteoHandle.text = data.meteo;
  locationHandle.text = data.location;
}

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Fetch weather when the connection opens
  fetchWeather();
}

// Listen for messages from the companion
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data) {
    processWeatherData(evt.data);
  }
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    let color = JSON.parse(evt.data.newValue);
   
    back.style.fill = color;
    
  }

  else
  {
    let batt = document.getElementById("batt");
    let color = JSON.parse(evt.data.newValue);
    timeHandle.style.fill = color;
    myLabel.style.fill = color;
    hrmLabel.style.fill = color;
    batteryLabel.style.fill = color;
    stepsTakenLabel.style.fill = color;
    dateLabel.style.fill = color;
    timeHandle.style.fill = color;
    temperatureHandle.style.fill = color;
    meteoHandle.style.fill = color;
    locationHandle.style.fill = color;
    dateLabel.style.fill = color;
    batt.ic = color;
    console.log(`Setting background color: ${color}`);
    
}


}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}

setInterval(fetchWeather, 60 * 1000 * 60); //update weather every hour (60 minutes per hour * 1000 millisecs * 60 seconds per hour)





