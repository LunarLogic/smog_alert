import axios from "axios";
import calendarActionTypes from "./calendar.types";

export const getCalendarStatusData = (year, location_id) => {
  return dispatch => {
    return axios
      .get(
        `/api/internal/measurements/calendar_status?year=${year}&location_id=${location_id}`
      )
      .then(({ data }) => {
        dispatch({
          type: calendarActionTypes.GET_CALENDAR_STATUS_DATA,
          payload: data
        });
      });
  };
};

export const getCalendarValuesData = (year, location_id) => {
  return dispatch => {
    return axios
      .get(
        `/api/internal/measurements/calendar_values?year=${year}&location_id=${location_id}`
      )
      .then(({ data }) => {
        dispatch({
          type: calendarActionTypes.GET_CALENDAR_VALUES_DATA,
          payload: data
        });
      });
  };
};

export const setCalendarChosenYear = chosenYear => ({
  type: calendarActionTypes.SET_CALENDAR_CHOSEN_YEAR,
  payload: chosenYear
});
