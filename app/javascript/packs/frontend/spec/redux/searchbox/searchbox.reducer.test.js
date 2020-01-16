import searchboxActionTypes from "../../../redux/searchbox/searchbox.types";

import searchboxReducer from "../../../redux/searchbox/searchbox.reducer";

describe("searchboxReducer", () => {
  const initialState = {
    location_display_name: "Zabierzów, Kolejowa 26"
  };

  it("should return initial state", () => {
    expect(searchboxReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle SET_CHOSEN_CITY", () => {
    expect(
      searchboxReducer(initialState, {
        type: searchboxActionTypes.SET_CHOSEN_CITY,
        payload: "Nielepice"
      })
    ).toEqual({
      location_display_name: "Nielepice"
    });
  });
});
