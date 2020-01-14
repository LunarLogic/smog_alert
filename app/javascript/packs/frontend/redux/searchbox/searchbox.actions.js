import searchboxActionTypes from "./searchbox.types";

export const setChosenCity = chosenCity => ({
  type: searchboxActionTypes.SET_CHOSEN_CITY,
  payload: chosenCity
});
