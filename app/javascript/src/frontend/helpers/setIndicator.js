import {
  excellent,
  good,
  moderate,
  bad,
  veryBad,
  dramatic
} from "./statusConstants.js";

const INDICATORS = {
  [excellent]: 1,
  [good]: 2,
  [moderate]: 3,
  [bad]: 4,
  [veryBad]: 5,
  [dramatic]: 6
};

export const setIndicator = lastHourMeasurement => {
  let indicator;
  if (!lastHourMeasurement) {
    indicator = null;
    return indicator;
  }
  return INDICATORS[lastHourMeasurement.status] || null;
};
