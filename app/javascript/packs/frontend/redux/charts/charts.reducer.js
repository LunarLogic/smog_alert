import chartsActionTypes from "./charts.types";

const INITIAL_STATE = {
  chartChosenCity: "Zabierzów, Wapienna"
};

const chartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chartsActionTypes.SET_CHART_CHOSEN_CITY:
      return {
        ...state,
        chartChosenCity: action.payload
      };
    default:
      return state;
  }
};

export default chartReducer;
