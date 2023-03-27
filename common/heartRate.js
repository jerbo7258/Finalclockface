import { HeartRateSensor } from "heart-rate";
import { BodyPresenceSensor } from "body-presence";
import { me as appbit } from "appbit";
export{hrtRM};
let hrtRM = 0;

if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.start();
  hrm.addEventListener("reading", () => {
     hrtRM = `${hrm.heartRate}`;
  });
}

