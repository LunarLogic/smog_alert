import thunkMiddleware from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";

import {
  getCalendarStatusData,
  getCalendarValuesData
} from "../../../redux/calendar/calendar.actions";
import calendarActionTypes from "../../../redux/calendar/calendar.types";
import calendarStatusDataMock from "../../__mocks__/calendarStatusDataMock.json";
import calendarValuesDataMock from "../../__mocks__/calendarValuesDataMock.json";

const mockStore = configureMockStore([thunkMiddleware]);
const mockAdapter = new MockAdapter(axios);

describe("calendar actions", () => {
  it("handles requesting calendar status API", async () => {
    mockAdapter
      .onGet(
        "/api/internal/measurements/calendar_status?year=2019&location_id=21"
      )
      .reply(200, calendarStatusDataMock);

    const expectedAction = [
      {
        type: calendarActionTypes.GET_CALENDAR_STATUS_DATA,
        payload: calendarStatusDataMock
      }
    ];

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    await store.dispatch(getCalendarStatusData(2019, 21)).then(() => {
      expect(action).toEqual(expectedAction);
    });
  });
  it("handles requesting calendar values API", async () => {
    mockAdapter
      .onGet(
        "/api/internal/measurements/calendar_values?year=2019&location_id=21"
      )
      .reply(200, calendarValuesDataMock);

    const expectedAction = [
      {
        type: calendarActionTypes.GET_CALENDAR_VALUES_DATA,
        payload: calendarValuesDataMock
      }
    ];

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    await store.dispatch(getCalendarValuesData(2019, 21)).then(() => {
      expect(action).toEqual(expectedAction);
    });
  });
});
