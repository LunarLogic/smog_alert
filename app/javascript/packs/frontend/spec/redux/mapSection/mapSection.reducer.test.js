import mapSectionActionTypes from "../../../redux/mapSection/mapSection.types";
import mapSectionReducer from "../../../redux/mapSection/mapSection.reducer";

describe("mapSection reducer", () => {
  const initialState = {
    location_name: "",
    hovered_city: ""
  };

  it("should return initial state", () => {
    expect(mapSectionReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_CHOSEN_CITY", () => {
    expect(
      mapSectionReducer(initialState, {
        type: mapSectionActionTypes.GET_CHOSEN_CITY,
        payload: "Nielepice"
      })
    ).toEqual({ location_name: "Nielepice", hovered_city: "" });
  });

  it("should handle GET_HOVERED_CITY", () => {
    expect(
      mapSectionReducer(initialState, {
        type: mapSectionActionTypes.GET_HOVERED_CITY,
        payload: "Brzoskwinia"
      })
    ).toEqual({ location_name: "", hovered_city: "Brzoskwinia" });
  });
});
