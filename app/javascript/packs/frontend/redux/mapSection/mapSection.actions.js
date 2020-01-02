import mapSectionActionTypes from "./mapSection.types";

export const getChosenCity = chosenCity => ({
  type: mapSectionActionTypes.GET_CHOSEN_CITY,
  payload: chosenCity
});
