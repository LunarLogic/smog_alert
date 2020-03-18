import {
  excellent,
  good,
  moderate,
  bad,
  veryBad,
  dramatic
} from "./statusConstants.js";

import {
  unhealthyFirst,
  unhealthySecond,
  badFirst,
  badSecond,
  neutralColor
} from "../styles/_variables.scss";

const COLORS = {
  [excellent]: neutralColor,
  [good]: neutralColor,
  [moderate]: unhealthyFirst,
  [bad]: unhealthySecond,
  [veryBad]: badFirst,
  [dramatic]: badSecond
};

export const setCloudColor = status => {
  return COLORS[status] || neutralColor;
};
