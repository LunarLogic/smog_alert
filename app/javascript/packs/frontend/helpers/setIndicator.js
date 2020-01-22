import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad
} from "./statusConstants.js";

const INDICATORS = {
  [veryGood]: 1,
  [good]: 2,
  [moderate]: 3,
  [sufficient]: 4,
  [bad]: 5,
  [veryBad]: 6
};

export const setIndicator = lastHourMeasurement => {
  let indicator;
  if (!lastHourMeasurement) {
    indicator = null;
    return indicator;
  }
  return INDICATORS[lastHourMeasurement.status] || null;
};
