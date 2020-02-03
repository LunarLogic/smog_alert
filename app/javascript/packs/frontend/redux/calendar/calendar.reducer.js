import calendarActionTypes from "./calendar.types";

const INITIAL_STATE = {
  calendarStatusData: {},
  calendarValuesData: {}
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
    default:
      return state;
  }
};

export default calendarReducer;
