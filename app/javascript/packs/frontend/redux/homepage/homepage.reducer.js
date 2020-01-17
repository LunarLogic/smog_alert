import homepageActionTypes from "./homepage.types";

const INITIAL_STATE = {
  citiesPollutionData: []
};

const homepageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case homepageActionTypes.GET_CITIES_POLLUTION_DATA:
      return {
        ...state,
        citiesPollutionData: action.payload
      };
    default:
      return state;
  }
};

export default homepageReducer;
