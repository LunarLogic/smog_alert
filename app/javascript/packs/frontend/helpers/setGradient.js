import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad
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
  [veryGood]: gradient(goodSecond, goodFirst),
  [good]: gradient(goodFirst, goodSecond),
  [moderate]: gradient(unhealthySecond, unhealthyFirst),
  [sufficient]: gradient(unhealthyFirst, unhealthySecond),
  [bad]: gradient(badSecond, badFirst),
  [veryBad]: gradient(badFirst, badSecond)
};

export const setGradient = lastHourMeasurement => {
  if (!lastHourMeasurement) {
    return gradient(noDataColor, noDataColor);
  }
  return (
    GRADIENTS[lastHourMeasurement.status] || gradient(noDataColor, noDataColor)
  );
};
