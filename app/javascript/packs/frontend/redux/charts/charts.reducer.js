import chartsActionTypes from "./charts.types";

const INITIAL_STATE = {
  chartChosenCity: "Zabierzów, Wapienna",
  chartChosenIndicator: "PM 10"
};

const chartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chartsActionTypes.SET_CHART_CHOSEN_CITY:
      return {
        ...state,
        chartChosenCity: action.payload
      };
    case chartsActionTypes.SET_CHART_CHOSEN_INDICATOR:
      return {
        ...state,
        chartChosenIndicator: action.payload
      };
    default:
      return state;
  }
};

export default chartReducer;
