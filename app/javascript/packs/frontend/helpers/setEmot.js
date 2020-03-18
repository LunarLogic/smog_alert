import {
  ExcellentEmot,
  GoodEmot,
  ModerateEmot,
  BadEmot,
  VeryBadEmot,
  DramaticEmot,
  NeutralEmot
} from "../components/Emots";

import {
  excellent,
  good,
  moderate,
  bad,
  veryBad,
  dramatic
} from "./statusConstants.js";

const EMOTS = {
  [excellent]: ExcellentEmot,
  [good]: GoodEmot,
  [moderate]: ModerateEmot,
  [bad]: BadEmot,
  [veryBad]: VeryBadEmot,
  [dramatic]: DramaticEmot
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
