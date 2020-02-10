import calendarActionTypes from "./calendar.types";
import { yesterdayDateFormatted } from "../../helpers";

const INITIAL_STATE = {
  calendarStatusData: {},
  calendarValuesData: {},
  calendarDailyValuesData: {},
  calendarChosenYear: new Date().getFullYear(),
  calendarChosenDay: yesterdayDateFormatted(),
  calendarChosenCity: "Zabierzów, Wapienna"
};

const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case calendarActionTypes.GET_CALENDAR_STATUS_DATA:
      return {
        ...state,
        calendarStatusData: action.payload.data
      };
    case calendarActionTypes.GET_CALENDAR_VALUES_DATA:
      return {
        ...state,
        calendarValuesData: action.payload
      };
    case calendarActionTypes.GET_CALENDAR_DAILY_VALUES_DATA:
      return {
        ...state,
        calendarDailyValuesData: action.payload
      };
    case calendarActionTypes.SET_CALENDAR_CHOSEN_YEAR:
      return {
        ...state,
        calendarChosenYear: action.payload
      };
    case calendarActionTypes.SET_CALENDAR_CHOSEN_DAY:
      return {
        ...state,
        calendarChosenDay: action.payload
      };
    case calendarActionTypes.SET_CALENDAR_CHOSEN_CITY:
      return {
        ...state,
        calendarChosenCity: action.payload
      };
    default:
      return state;
  }
};

export default calendarReducer;
