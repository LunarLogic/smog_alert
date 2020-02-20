import axios from "axios";
import chartsActionTypes from "./charts.types";

export const setChartChosenCity = chosenCity => ({
  type: chartsActionTypes.SET_CHART_CHOSEN_CITY,
  payload: chosenCity
});
