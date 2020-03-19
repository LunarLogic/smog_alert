import {
  excellent,
  good,
  moderate,
  bad,
  veryBad,
  dramatic,
  noSufficientData
} from "./statusConstants.js";

const CLASSNAMES = {
  [excellent]: "excellent",
  [good]: "good",
  [moderate]: "moderate",
  [bad]: "bad",
  [veryBad]: "very-bad",
  [dramatic]: "dramatic",
  [noSufficientData]: "no-sufficient-data"
};

export const classNameForPollutionStatus = status => {
  return CLASSNAMES[status] || "no-sufficient-data";
};
