import {
  getChosenCity,
  getHoveredCity
} from "../../../redux/mapSection/mapSection.actions";
import mapSectionActionTypes from "../../../redux/mapSection/mapSection.types";

describe("mapSection actions", () => {
  it("should create an action for mapSection to set chosen city", () => {
    const chosenCity = "Nielepice";
    const expectedActionChosen = {
      type: mapSectionActionTypes.GET_CHOSEN_CITY,
      payload: chosenCity
    };
    expect(getChosenCity(chosenCity)).toEqual(expectedActionChosen);
  });
  it("should create an action for mapSection to set hoveredCity", () => {
    const hoveredCity = "Brzoskwinia";
    const expectedActionHovered = {
      type: mapSectionActionTypes.GET_HOVERED_CITY,
      payload: hoveredCity
    };
    expect(getHoveredCity(hoveredCity)).toEqual(expectedActionHovered);
  });
});
