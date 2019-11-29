import mapActionTypes from "./map.types";

const INITIAL_STATE = {
  citiesPollutionData: [],
  location: "",
  pollutionValue: null
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case mapActionTypes.GET_CITIES_POLLUTION_DATA:
      return {
        ...state,
        citiesPollutionData: action.payload
      };
    case mapActionTypes.GET_MAP_AREA_DATA:
      return {
        ...state,
        location: action.payload.location,
        pollutionValue: action.payload.pollutionValue
      };
    default:
      return state;
  }
};

export default mapReducer;
