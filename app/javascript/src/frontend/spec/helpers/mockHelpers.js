import mockCities from "../__mocks__/citiesPollutionDataMock.json";
import articlesMock from "../__mocks__/articlesMock.json";
import calendarDailyValuesMock from "../__mocks__/calendarDailyValuesMock.json";
import calendarStatusDataMock from "../__mocks__/calendarStatusDataMock.json";
import chartFirstMonthDataMock from "../__mocks__/chartFirstMonthDataMock.json";
import chartHourlyAverageForMonthData from "../__mocks__/chartHourlyAverageForMonthDataMock.json";

export function mockGettingCurrentMeasurements(mockAdapter) {
  mockAdapter
    .onGet("/api/internal/measurements/current")
    .reply(200, mockCities);
}
export function mockGettingOrganizationCurrentData(mockAdapter) {
  mockAdapter.onGet("/api/internal/organizations/current_data").reply(200, {
    data: {
      name: "Zabierzowski Alarm Smogowy",
      description: "bla bla",
      email: "test@test.pl",
      facebook: "http://aasdsa.pl"
    }
  });
}

export function mockGettingArticles(mockAdapter) {
  mockAdapter.onGet("/api/internal/articles").reply(200, articlesMock);
}

export function mockGettingCalendarValuesData(mockAdapter) {
  mockAdapter
    .onGet(
      "api/internal/measurements/calendar_daily_values?date=2020-07-13&location_id=25"
    )
    .reply(200, calendarDailyValuesMock);
}

export function mockGettingCalendarStatusData(mockAdapter) {
  mockAdapter
    .onGet(
      "/api/internal/measurements/calendar_status?year=2020&location_id=25"
    )
    .reply(200, { data: { ...calendarStatusDataMock } });
}

export function mockGettingFirstMonthData(mockAdapter) {
  mockAdapter
    .onGet("/api/internal/measurements/first_month")
    .reply(200, chartFirstMonthDataMock);
}

export function mockGettingHourlyAverageForMothData(mockAdapter) {
  mockAdapter
    .onGet(
      "/api/internal/measurements/hourly_average_for_month?date=01-6-2020&location_id=25"
    )
    .reply(200, chartHourlyAverageForMonthData);
}
