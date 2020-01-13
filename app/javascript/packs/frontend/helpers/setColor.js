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
} from "../styles/_variables";

export const setColor = lastHourMeasurement => {
  let color;
  if (!lastHourMeasurement) {
    color = noDataColor;
    return color;
  }
  switch (lastHourMeasurement.status) {
    case veryGood:
      color = goodFirst;
      break;
    case good:
      color = goodSecond;
      break;
    case moderate:
      color = unhealthyFirst;
      break;
    case sufficient:
      color = unhealthySecond;
      break;
    case bad:
      color = badFirst;
      break;
    case veryBad:
      color = badSecond;
      break;
  }
  return color;
};
