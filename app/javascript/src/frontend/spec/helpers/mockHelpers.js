import mockCities from "../__mocks__/citiesPollutionDataMock.json";
import articlesMock from "../__mocks__/articlesMock.json";

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
