import mapActionTypes from "./homepage.types";

const INITIAL_STATE = {
  citiesPollutionData: [],
  location: "",
  pollutionValue: null
};

const homepageReducer = (state = INITIAL_STATE, action) => {
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

export default homepageReducer;
