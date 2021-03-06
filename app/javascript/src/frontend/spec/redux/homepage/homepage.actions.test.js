import {
  getCitiesPollutionData,
  setPopUpStatus
} from "../../../redux/homepage/homepage.actions";
import thunkMiddleware from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import configureMockStore from "redux-mock-store";
import homepageActionTypes from "../../../redux/homepage/homepage.types";
import mockCitiesPollutionData from "../../__mocks__/citiesPollutionDataMock.json";

const mockStore = configureMockStore([thunkMiddleware]);

const mockAdapter = new MockAdapter(axios);

describe("homepage actions", () => {
  it("handles requesting homepage API", async () => {
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
    await store.dispatch(getCitiesPollutionData()).then(() => {
      expect(action).toEqual(expectedAction);
    });
  });
  it("handles an action for homepage to set popUpOpen variable", () => {
    const popUpOpen = true;
    const expectedAction = {
      type: homepageActionTypes.SET_POPUP_STATUS,
      payload: popUpOpen
    };
    expect(setPopUpStatus(popUpOpen)).toEqual(expectedAction);
  });
});
