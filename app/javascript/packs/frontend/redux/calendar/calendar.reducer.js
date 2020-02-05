import calendarActionTypes from "./calendar.types";

const INITIAL_STATE = {
  calendarStatusData: {},
  calendarValuesData: {},
  calendarChosenYear: new Date().getFullYear()
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
    default:
      return state;
  }
};

export default calendarReducer;
