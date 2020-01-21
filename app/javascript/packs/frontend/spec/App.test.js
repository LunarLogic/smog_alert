import React from "react";
import { mount } from "enzyme";
import { Homepage } from "../pages/Homepage/Homepage";
import { Error404 } from "../components";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import configureStore from "redux-mock-store";
// const mockStore = configureStore([]);

describe("Routing component", () => {
  //   let store;
  //   beforeEach(() => {
  //     store = mockStore({
  //       homepage: {
  //         citiesPollutionData: ["a", "b"]
  //       },
  //       searchbox: {
  //         location_dispay_name: "Nielepice"
  //       },
  //       mapSection: { location_name: "", hovered_city: "" }
  //     });
  //   });

  it("invalid path should redirect to 404", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/random"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Homepage)).toHaveLength(0);
    expect(wrapper.find(Error404)).toHaveLength(1);
  });

  it("valid path should redirect to Homepage", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Homepage)).toHaveLength(1);
    expect(wrapper.find(Error404)).toHaveLength(0);
  });
});
