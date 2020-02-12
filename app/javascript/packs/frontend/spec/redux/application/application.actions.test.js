import applicationActionTypes from "../../../redux/application/application.types";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {
  setCurrentPath,
  getOrganizationDetails
} from "../../../redux/application/application.actions";
import organizationDetailsMock from "../../__mocks__/organizationDetailsMock.json";

const mockStore = configureMockStore([thunkMiddleware]);

const mockAdaper = new MockAdapter(axios);

describe("application actions", () => {
  it("should create an action to set current path", () => {
    const path = "/aktualnosci";
    const expectedAction = {
      type: applicationActionTypes.SET_CURRENT_PATH,
      payload: path
    };
    expect(setCurrentPath(path)).toEqual(expectedAction);
  });

  it("handles requesting organization details API", () => {
    mockAdaper
      .onGet("/api/internal/organizations/current_data")
      .reply(200, organizationDetailsMock);

    const expectedAction = [
      {
        type: applicationActionTypes.GET_ORGANIZATION_DETAILS,
        payload: organizationDetailsMock.data
      }
    ];

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    store
      .dispatch(getOrganizationDetails())
      .then(() => expect(action).toEqual(expectedAction));
  });
});
