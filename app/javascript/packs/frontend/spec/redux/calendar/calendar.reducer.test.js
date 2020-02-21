import calendarReducer from "../../../redux/calendar/calendar.reducer";
import calendarActionTypes from "../../../redux/calendar/calendar.types";
import { yesterdayDateFormatted } from "../../../helpers";

describe("calendar reducer", () => {
  const initialState = {
    calendarStatusData: {},
    calendarValuesData: {},
    calendarChosenYear: new Date().getFullYear(),
    calendarChosenDay: yesterdayDateFormatted(),
    calendarChosenCity: "Zabierzów, Wapienna",
    calendarDailyValuesData: {}
  };
  it("should return initial state", () => {
    expect(calendarReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle getCalendarStatusData action", () => {
    const statusData = {
      data: {
        2019: [
          {
            status: "umiarkowany",
            days: ["2019-12-22", "2019-12-20", "2019-12-23", "2019-12-25"]
          }
        ]
      }
    };
    expect(
      calendarReducer(initialState, {
        type: calendarActionTypes.GET_CALENDAR_STATUS_DATA,
        payload: statusData
      })
    ).toEqual({
      calendarStatusData: {
        2019: [
          {
            status: "umiarkowany",
            days: ["2019-12-22", "2019-12-20", "2019-12-23", "2019-12-25"]
          }
        ]
      },
      calendarValuesData: {},
      calendarChosenYear: new Date().getFullYear(),
      calendarChosenDay: yesterdayDateFormatted(),
      calendarChosenCity: "Zabierzów, Wapienna",
      calendarDailyValuesData: {}
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
      },
      calendarChosenYear: new Date().getFullYear(),
      calendarChosenDay: yesterdayDateFormatted(),
      calendarChosenCity: "Zabierzów, Wapienna",
      calendarDailyValuesData: {}
    });
  });
});
