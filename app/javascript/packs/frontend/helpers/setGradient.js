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

const gradient = (color1, color2) => ({
  color1: color1,
  color2: color2
});

const GRADIENTS = {
  [excellent]: gradient(goodSecond, goodFirst),
  [good]: gradient(goodFirst, goodSecond),
  [moderate]: gradient(unhealthySecond, unhealthyFirst),
  [bad]: gradient(unhealthyFirst, unhealthySecond),
  [veryBad]: gradient(badSecond, badFirst),
  [dramatic]: gradient(badFirst, badSecond)
};

export const setGradient = lastHourMeasurement => {
  if (!lastHourMeasurement) {
    return gradient(noDataColor, noDataColor);
  }
  return (
    GRADIENTS[lastHourMeasurement.status] || gradient(noDataColor, noDataColor)
  );
};
