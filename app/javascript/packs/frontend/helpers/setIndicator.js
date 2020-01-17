import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad
} from "./statusConstants.js";

export const setIndicator = lastHourMeasurement => {
  let indicator;
  if (!lastHourMeasurement) {
    indicator = null;
    return indicator;
  }
  switch (lastHourMeasurement.status) {
    case veryGood:
      indicator = 1;
      break;
    case good:
      indicator = 2;
      break;
    case moderate:
      indicator = 3;
      break;
    case sufficient:
      indicator = 4;
      break;
    case bad:
      indicator = 5;
      break;
    case veryBad:
      indicator = 6;
      break;
    default:
      indicator = null;
  }
  return indicator;
};
