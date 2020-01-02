import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad
} from "./statusConstants.js";

export const setColor = status => {
  let color;
  switch (status) {
    case veryGood:
      color = "#97cd2e";
      break;
    case good:
      color = "#c3d735";
      break;
    case moderate:
      color = "#fbd42d";
      break;
    case sufficient:
      color = "#ff8f00";
      break;
    case bad:
      color = "#cc571a";
      break;
    case veryBad:
      color = "#7d0d0f";
      break;
  }
  return color;
};
