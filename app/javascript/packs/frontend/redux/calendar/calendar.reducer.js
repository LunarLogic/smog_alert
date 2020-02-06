import calendarActionTypes from "./calendar.types";
import { currentDayFormatted } from "../../helpers/currentDateFormatted";

const INITIAL_STATE = {
  calendarStatusData: {},
  calendarValuesData: {},
  calendarChosenYear: new Date().getFullYear(),
  calendarChosenDay: currentDayFormatted()
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
    default:
      return state;
  }
};

export default calendarReducer;
