import { setChosenCity } from "../../../redux/searchbox/searchbox.actions";
import searchboxActionTypes from "../../../redux/searchbox/searchbox.types";

it("should create an action for searchbox to set chosen city", () => {
  const chosenCity = "";
  const expectedAction = {
    type: searchboxActionTypes.SET_CHOSEN_CITY,
    payload: chosenCity
  };
  expect(setChosenCity(chosenCity)).toEqual(expectedAction);
});
