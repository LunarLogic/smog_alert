import homepageReducer from "../../../redux/homepage/homepage.reducer";
import homepageActionTypes from "../../../redux/homepage/homepage.types";

describe("homepage reducer", () => {
  const initialState = {
    citiesPollutionData: []
  };
  it("should return initial state", () => {
    expect(homepageReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle getCitiesPollutionData action", () => {
    expect(
      homepageReducer(initialState, {
        type: homepageActionTypes.GET_CITIES_POLLUTION_DATA,
        payload: [{ location: "Nielepice" }]
      })
    ).toEqual({ citiesPollutionData: [{ location: "Nielepice" }] });
  });
});
