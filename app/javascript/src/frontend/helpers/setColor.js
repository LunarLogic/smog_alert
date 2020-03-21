import {
  excellent,
  good,
  moderate,
  bad,
  veryBad,
  dramatic
} from "./statusConstants.js";

import {
  goodFirst,
  goodSecond,
  unhealthyFirst,
  unhealthySecond,
  badFirst,
  badSecond,
  noDataColor
} from "../styles/_variables.scss";

const SETTINGS = {
  [excellent]: goodFirst,
  [good]: goodSecond,
  [moderate]: unhealthyFirst,
  [bad]: unhealthySecond,
  [veryBad]: badFirst,
  [dramatic]: badSecond
};

export const setColor = lastHourMeasurement => {
  return lastHourMeasurement
    ? SETTINGS[lastHourMeasurement.status] || noDataColor
    : noDataColor;
};
