import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad
} from "./statusConstants.js";

import {
  unhealthyFirst,
  unhealthySecond,
  badFirst,
  badSecond,
  neutralColor
} from "../styles/_variables.scss";

const COLORS = {
  [veryGood]: neutralColor,
  [good]: neutralColor,
  [moderate]: unhealthyFirst,
  [sufficient]: unhealthySecond,
  [bad]: badFirst,
  [veryBad]: badSecond
};

export const setCloudColor = status => {
  return COLORS[status] || neutralColor;
};
