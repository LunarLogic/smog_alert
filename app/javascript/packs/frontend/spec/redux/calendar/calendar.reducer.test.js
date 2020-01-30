import calendarReducer from "../../../redux/calendar/calendar.reducer";
import calendarActionTypes from "../../../redux/calendar/calendar.types";

describe("calendar reducer", () => {
  const initialState = {
    calendarStatusData: {},
    calendarValuesData: {}
  };
  it("should return initial state", () => {
    expect(calendarReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle getCalendarStatusData action", () => {
    const statusData = { 2019: { umiarkowany: ["2019-12-06", "2019-12-04"] } };
    expect(
      calendarReducer(initialState, {
        type: calendarActionTypes.GET_CALENDAR_STATUS_DATA,
        payload: statusData
      })
    ).toEqual({
      calendarStatusData: {
        2019: { umiarkowany: ["2019-12-06", "2019-12-04"] }
      },
      calendarValuesData: {}
    });
  });
  it("should handle getCalendarValuesData action", () => {
    const valuesData = {
      year: 2019,
      daily_average_measurements: [
        {
          day: "2019-12-06",
          pm10: "67.775",
          pm25: "65.845",
          number_of_measurements: 2
        }
      ]
    };
    expect(
      calendarReducer(initialState, {
        type: calendarActionTypes.GET_CALENDAR_VALUES_DATA,
        payload: valuesData
      })
    ).toEqual({
      calendarStatusData: {},
      calendarValuesData: {
        year: 2019,
        daily_average_measurements: [
          {
            day: "2019-12-06",
            pm10: "67.775",
            pm25: "65.845",
            number_of_measurements: 2
          }
        ]
      }
    });
  });
});
