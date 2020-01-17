import { getCitiesPollutionData } from "../../../redux/homepage/homepage.actions";
import thunkMiddleware from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import configureMockStore from "redux-mock-store";
import homepageActionTypes from "../../../redux/homepage/homepage.types";
import mockCitiesPollutionData from "../../__mocks__/citiesPollutionDataMock.json";

const mockStore = configureMockStore([thunkMiddleware]);

const mockAdapter = new MockAdapter(axios);

describe("homepage actions", () => {
  it("handles requesting homepage API", () => {
    mockAdapter
      .onGet("/api/internal/measurements/current")
      .reply(200, mockCitiesPollutionData);

    const expectedAction = [
      {
        type: homepageActionTypes.GET_CITIES_POLLUTION_DATA,
        payload: mockCitiesPollutionData.data
      }
    ];
    const store = mockStore({ payload: {} });
    const action = store.getActions();
    store.dispatch(getCitiesPollutionData()).then(() => {
      expect(action).toEqual(expectedAction);
    });
  });
});
