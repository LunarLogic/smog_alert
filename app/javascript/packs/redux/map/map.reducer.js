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
    default:
      return state;
  }
};

export default mapReducer;
