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

export const setGradient = lastHourMeasurement => {
  let gradientColors = {};
  if (!lastHourMeasurement) {
    (gradientColors.color1 = noDataColor),
      (gradientColors.color2 = noDataColor);
    return gradientColors;
  }
  switch (lastHourMeasurement.status) {
    case veryGood:
      gradientColors.color1 = goodSecond;
      gradientColors.color2 = goodFirst;
      break;
    case good:
      gradientColors.color1 = goodFirst;
      gradientColors.color2 = goodSecond;
      break;
    case moderate:
      gradientColors.color1 = unhealthySecond;
      gradientColors.color2 = unhealthyFirst;
      break;
    case sufficient:
      gradientColors.color1 = unhealthyFirst;
      gradientColors.color2 = unhealthySecond;
      break;
    case bad:
      gradientColors.color1 = badSecond;
      gradientColors.color2 = badFirst;
      break;
    case veryBad:
      gradientColors.color1 = badFirst;
      gradientColors.color2 = badSecond;
      break;
  }
  return gradientColors;
};
