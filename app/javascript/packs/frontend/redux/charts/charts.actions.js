import axios from "axios";
import chartsActionTypes from "./charts.types";

export const getChartHourlyAverageForMonthData = (date, location_id) => {
  return dispatch => {
    return axios
      .get(
        `/api/internal/measurements/hourly_average_for_month?date=${date}&location_id=${location_id}`
      )
      .then(({ data }) => {
        dispatch({
          type: chartsActionTypes.GET_CHART_HOURLY_AVERAGE_FOR_MONTH_DATA,
          payload: data
        });
      });
  };
};

export const getChartFirstMonth = () => {
  return dispatch => {
    return axios
      .get(`/api/internal/measurements/first_month`)
      .then(({ data }) => {
        dispatch({
          type: chartsActionTypes.GET_CHART_FIRST_MONTH,
          payload: data
        });
      });
  };
};

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
