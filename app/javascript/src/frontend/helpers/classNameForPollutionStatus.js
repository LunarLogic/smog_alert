import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad,
  noSufficientData
} from "./statusConstants.js";

const CLASSNAMES = {
  [veryGood]: "very-good",
  [good]: "good",
  [moderate]: "moderate",
  [sufficient]: "sufficient",
  [bad]: "bad",
  [veryBad]: "very-bad",
  [noSufficientData]: "no-sufficient-data"
};

export const classNameForPollutionStatus = status => {
  return CLASSNAMES[status] || "no-sufficient-data";
};
