import React from "react";
import { mount } from "enzyme";
import { Homepage } from "../pages/Homepage/Homepage";
import { Error404 } from "../pages";
import App from "../App";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// import mockCities from "../spec/__mocks__/citiesPollutionDataMock.json";
// import configureStore from "redux-mock-store";
// const mockStore = configureStore([]);

describe("Routing component", () => {
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

describe("Integration test for Homepage", () => {
  // it("list opens", () => {
  //   const getCitiesPollutionData = jest.fn(() => {
  //     return mockCities;
  //   });
  //   console.log(getCitiesPollutionData());
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <Homepage getCitiesPollutionData={getCitiesPollutionData} />
  //     </Provider>
  //   );
  //   const input = wrapper.find("input");
  //   input.simulate("focus");
  //   input.simulate("change", { target: { value: "Brzoskwinia" } });
  //   expect(wrapper.find("input").props().value).toEqual("Brzoskwinia");
  //   wrapper.update();
  //   wrapper
  //     .find("li")
  //     .at(0)
  //     .simulate("click");
  //   expect(wrapper.find("input").props().value).toEqual("");
  // });
});
