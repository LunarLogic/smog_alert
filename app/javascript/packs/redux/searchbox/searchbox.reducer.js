import searchboxActionTypes from "./searchbox.types";

const INITIAL_STATE = {
  location: "Zabierzów",
  pm10: "54",
  pm25: "27",
  color: "#ff8f00",
  text: "Niezdrowa",
  indicator: 4
};

const searchboxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchboxActionTypes.GET_CITY_POLLUTION_DATA:
      return {
        ...state,
        location: action.payload.location,
        pm10: action.payload.pm10,
        pm25: action.payload.pm25,
        color: action.payload.color,
        text: action.payload.text,
        indicator: action.payload.indicator
      };
    default:
      return state;
  }
};

export default searchboxReducer;
