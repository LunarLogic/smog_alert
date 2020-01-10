import {
  VeryGoodEmot,
  GoodEmot,
  ModerateEmot,
  SufficientEmot,
  BadEmot,
  VeryBadEmot
} from "../components/Emots";

import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad
} from "./statusConstants.js";

export const setEmot = status => {
  let emot;
  switch (status) {
    case veryGood:
      emot = VeryGoodEmot;
      break;
    case good:
      emot = GoodEmot;
      break;
    case moderate:
      emot = ModerateEmot;
      break;
    case sufficient:
      emot = SufficientEmot;
      break;
    case bad:
      emot = BadEmot;
      break;
    case veryBad:
      emot = VeryBadEmot;
      break;
  }
  return emot();
};
