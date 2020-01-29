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

const COLORS = {
  [veryGood]: goodFirst,
  [good]: goodSecond,
  [moderate]: unhealthyFirst,
  [sufficient]: unhealthySecond,
  [bad]: badFirst,
  [veryBad]: badSecond
};

export const setAverageColor = status => {
  let color;
  if (!status) {
    color = noDataColor;
    return color;
  }
  color = COLORS[status] || noDataColor;

  return color;
};
