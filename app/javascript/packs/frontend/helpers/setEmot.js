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

const EMOTS = {
  [veryGood]: VeryGoodEmot,
  [good]: GoodEmot,
  [moderate]: ModerateEmot,
  [sufficient]: SufficientEmot,
  [bad]: BadEmot,
  [veryBad]: VeryBadEmot
};

export const setEmot = lastHourMeasurement => {
  let emot;
  if (!lastHourMeasurement) {
    emot = NeutralEmot;
    return emot();
  }
  emot = EMOTS[lastHourMeasurement.status] || NeutralEmot;
  return emot();
};
