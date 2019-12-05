import cityListActionTypes from "./cityList.types";

const INITIAL_STATE = {
  locations: []
};

const cityListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cityListActionTypes.GET_CITY_LIST:
      return {
        ...state,
        locations: action.payload
      };
    default:
      return state;
  }
};

export default cityListReducer;
