import {
  VeryGoodEmot,
  GoodEmot,
  ModerateEmot,
  SufficientEmot,
  BadEmot,
  VeryBadEmot,
  NeutralEmot
} from "../components/Emots";

import {
  veryGood,
  good,
  moderate,
  sufficient,
  bad,
  veryBad
} from "./statusConstants.js";

export const setEmot = lastHourMeasurement => {
  let emot;
  if (!lastHourMeasurement) {
    emot = NeutralEmot;
    return emot();
  }
  switch (lastHourMeasurement.status) {
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
