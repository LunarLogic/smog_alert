import chartReducer from "../../../redux/charts/charts.reducer";
import chartsActionTypes from "../../../redux/charts/charts.types";
import { formatMonthlyDate, findPreviousMonth } from "../../../helpers";

describe("calendar reducer", () => {
  const initialState = {
    chartChosenCity: "Zabierzów, Wapienna",
    chartChosenIndicator: "PM 10",
    chartChosenMonth: formatMonthlyDate(findPreviousMonth(new Date())),
    chartHourlyAverageForMonthData: {}
  };
  it("should return initial state", () => {
    expect(chartReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle SET_CHART_CHOSEN_CITY action", () => {
    const mockChosenCity = "Nielepice";
    expect(
      chartReducer(initialState, {
        type: chartsActionTypes.SET_CHART_CHOSEN_CITY,
        payload: mockChosenCity
      })
    ).toEqual({
      chartChosenCity: "Nielepice",
      chartChosenIndicator: "PM 10",
      chartChosenMonth: formatMonthlyDate(findPreviousMonth(new Date())),
      chartHourlyAverageForMonthData: {}
    });
  });
  it("should handle SET_CHART_CHOSEN_INDICATOR action", () => {
    const mockChosenIndicator = "PM 2.5";
    expect(
      chartReducer(initialState, {
        type: chartsActionTypes.SET_CHART_CHOSEN_INDICATOR,
        payload: mockChosenIndicator
      })
    ).toEqual({
      chartChosenCity: "Zabierzów, Wapienna",
      chartChosenIndicator: "PM 2.5",
      chartChosenMonth: formatMonthlyDate(findPreviousMonth(new Date())),
      chartHourlyAverageForMonthData: {}
    });
  });
  it("should handle SET_CHART_CHOSEN_MONTH action", () => {
    const mockChosenMonth = "01-02-2020";
    expect(
      chartReducer(initialState, {
        type: chartsActionTypes.SET_CHART_CHOSEN_MONTH,
        payload: mockChosenMonth
      })
    ).toEqual({
      chartChosenCity: "Zabierzów, Wapienna",
      chartChosenIndicator: "PM 10",
      chartChosenMonth: "01-02-2020",
      chartHourlyAverageForMonthData: {}
    });
  });
  it("should handle GET_CHART_HOURLY_AVERAGE_FOR_MONTH_DATA action", () => {
    const mockChartHourlyAverageForMonthData = {
      data: {
        location_id: 26,
        location_name: "Zabierzów, Wapienna",
        month: 12,
        year: 2019,
        average_pollution_by_hour: {
          average_pm10: [],
          average_pm25: []
        }
      }
    };
    expect(
      chartReducer(initialState, {
        type: chartsActionTypes.GET_CHART_HOURLY_AVERAGE_FOR_MONTH_DATA,
        payload: mockChartHourlyAverageForMonthData
      })
    ).toEqual({
      chartChosenCity: "Zabierzów, Wapienna",
      chartChosenIndicator: "PM 10",
      chartChosenMonth: formatMonthlyDate(findPreviousMonth(new Date())),
      chartHourlyAverageForMonthData: {
        location_id: 26,
        location_name: "Zabierzów, Wapienna",
        month: 12,
        year: 2019,
        average_pollution_by_hour: {
          average_pm10: [],
          average_pm25: []
        }
      }
    });
  });
});
