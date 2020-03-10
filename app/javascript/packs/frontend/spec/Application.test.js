import React from "react";
import { mount } from "enzyme";
import { Homepage } from "../pages/Homepage/Homepage";
import { Error404 } from "../pages/Error404/Error404";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import {
  mockGettingCurrentMeasurements,
  mockGettingOrganizationCurrentData
} from "./helpers/mockHelpers";
import flushPromises from "./helpers/flushPromises";

describe("Routing component", () => {
  it("invalid path should redirect to 404", async () => {
    const mockAdapter = new MockAdapter(axios);
    mockGettingOrganizationCurrentData(mockAdapter);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find(Homepage)).toHaveLength(0);
    expect(wrapper.find(Error404)).toHaveLength(1);
  });

  it("valid path should redirect to Homepage", async () => {
    const mockAdapter = new MockAdapter(axios);
    mockGettingCurrentMeasurements(mockAdapter);
    mockGettingOrganizationCurrentData(mockAdapter);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await flushPromises();
    wrapper.update();

    expect(wrapper.find(Homepage)).toHaveLength(1);
    expect(wrapper.find(Error404)).toHaveLength(0);
  });
});

describe("Integration test for Homepage", () => {
  it("list opens", async () => {
    const mockAdapter = new MockAdapter(axios);
    mockGettingCurrentMeasurements(mockAdapter);
    mockGettingOrganizationCurrentData(mockAdapter);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await flushPromises();
    wrapper.update();

    const input = wrapper.find("input");
    input.simulate("focus");
    input.simulate("change", { target: { value: "Brzoskwinia" } });
    expect(wrapper.find("input").props().value).toEqual("Brzoskwinia");

    wrapper
      .find("li")
      .at(0)
      .simulate("click");
    expect(wrapper.find("input").props().value).toEqual("");
    expect(wrapper.find(".current-pollution__heading").text()).toEqual(
      "Aktualna jakość powietrza w miejscowościBrzoskwinia, Brzoskwinia 186"
    );
  });
});
