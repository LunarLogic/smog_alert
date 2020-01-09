import mapSectionActionTypes from "./mapSection.types";

export const getChosenCity = chosenCity => ({
  type: mapSectionActionTypes.GET_CHOSEN_CITY,
  payload: chosenCity
});

export const getHoveredCity = hoveredCity => ({
  type: mapSectionActionTypes.GET_HOVERED_CITY,
  payload: hoveredCity
});
