import thunkMiddleware from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";

import {
  getChartHourlyAverageForMonthData,
  getChartFirstMonth
} from "../../../redux/charts/charts.actions";
import chartsActionTypes from "../../../redux/charts/charts.types";
import chartHourlyAverageForMonthDataMock from "../../__mocks__/chartHourlyAverageForMonthDataMock.json";
import chartFirstMonthDataMock from "../../__mocks__/chartFirstMonthDataMock.json";

const mockStore = configureMockStore([thunkMiddleware]);
const mockAdapter = new MockAdapter(axios);

describe("charts actions", () => {
  it("handles requesting charts API", async () => {
    mockAdapter
      .onGet(
        "api/internal/measurements/hourly_average_for_month?date=01-12-2019&location_id=15"
      )
      .reply(200, chartHourlyAverageForMonthDataMock);

    const expectedAction = [
      {
        type: chartsActionTypes.GET_CHART_HOURLY_AVERAGE_FOR_MONTH_DATA,
        payload: chartHourlyAverageForMonthDataMock
      }
    ];

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    await store
      .dispatch(getChartHourlyAverageForMonthData("01-12-2019", 15))
      .then(() => {
        expect(action).toEqual(expectedAction);
      });
  });
  it("handles requesting first available month for the datepicker in charts section", async () => {
    mockAdapter
      .onGet("api/internal/measurements/first_month")
      .reply(200, chartFirstMonthDataMock);

    const expectedAction = [
      {
        type: chartsActionTypes.GET_CHART_FIRST_MONTH,
        payload: chartFirstMonthDataMock
      }
    ];

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    await store.dispatch(getChartFirstMonth()).then(() => {
      expect(action).toEqual(expectedAction);
    });
  });
});
