// TODO:
import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Router, BrowserRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import { Navigation } from "../../../components/Navigation/Navigation";
import App from "../../../App";

import {
  mockGettingCurrentMeasurements,
  mockGettingOrganizationCurrentData,
  mockGettingArticles
} from "../../helpers/mockHelpers";
import flushPromises from "../../helpers/flushPromises";
import { store } from "../../../redux/store";

describe("Navigation component", () => {
  it("renders correct page when user chooses option from navigation", async () => {
    // const mockAdaper = new MockAdapter(axios);
    // mockGettingCurrentMeasurements(mockAdaper);
    // mockGettingArticles(mockAdaper);
    // mockGettingOrganizationCurrentData(mockAdaper);
    // // const history = createMemoryHistory();
    // const wrapper = mount(
    //   <Provider store={store}>
    //     <BrowserRouter>
    //       <App />
    //     </BrowserRouter>
    //   </Provider>
    // );
    //
    //     await flushPromises();
    //     wrapper.update();
    //     expect(wrapper.exists(".homepage")).toEqual(true);
    //     const navLink = wrapper.find(".navigation__links-item");
    //     // expect(navLink.at(0).hasClass("active")).toEqual(true);
    //     act(() => {
    //       navLink.at(0).simulate("click");
    //     });
    //     expect(wrapper.exists(".news")).toEqual(true);
  });
});
