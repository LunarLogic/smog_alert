import mapSectionActionTypes from "./mapSection.types";

const INITIAL_STATE = {
  location_name: "",
  hovered_city: ""
};

const mapSectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case mapSectionActionTypes.GET_CHOSEN_CITY:
      return {
        ...state,
        location_name: action.payload
      };
    case mapSectionActionTypes.GET_HOVERED_CITY:
      return {
        ...state,
        hovered_city: action.payload
      };
    default:
      return state;
  }
};

export default mapSectionReducer;
