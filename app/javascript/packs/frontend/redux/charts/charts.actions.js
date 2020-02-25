import axios from "axios";
import chartsActionTypes from "./charts.types";

export const setChartChosenCity = chosenCity => ({
  type: chartsActionTypes.SET_CHART_CHOSEN_CITY,
  payload: chosenCity
});

export const setChartChosenIndicator = chosenIndicator => ({
  type: chartsActionTypes.SET_CHART_CHOSEN_INDICATOR,
  payload: chosenIndicator
});

export const setChartChosenMonth = chosenMonth => ({
  type: chartsActionTypes.SET_CHART_CHOSEN_MONTH,
  payload: chosenMonth
});
