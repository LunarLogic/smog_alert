import React from "react";
import { shallow, mount } from "enzyme";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";

import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";

import { MapSection } from "../../../sections/MapSection/MapSection";
import App from "../../../App";

import {
  mockGettingCurrentMeasurements,
  mockGettingOrganizationCurrentData
} from "../../helpers/mockHelpers.js";
import flushPromises from "../../helpers/flushPromises";
import { store } from "../../../redux/store";

describe("Map section tests", () => {
  const mockAdapter = new MockAdapter(axios);
  mockGettingCurrentMeasurements(mockAdapter);
  mockGettingOrganizationCurrentData(mockAdapter);

  const history = createMemoryHistory();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it("click on map opens pollution card with proper city chosen", async () => {
    await flushPromises();
    const mapElement = await screen.getAllByText(/Nielepice/i)[0];
    fireEvent.click(mapElement);
    expect(
      await screen.findByText(/Aktualna jakość powietrza dla lokalizacji/i)
    );
    expect(await screen.findByText(/Nielepice, Józefa Trzaskowskiego/i));
  });
});

// describe("Map section", () => {
//   it("renders PollutionComparison component, when no city is chosen", () => {
//     const wrapper = shallow(<MapSection chosenCity="" />);
//     expect(wrapper.exists("Connect(PollutionComparison)")).toEqual(true);
//     expect(wrapper.exists("Connect(PollutionSideCard)")).toEqual(false);
//   });

//   it("renders PollutionSideCard component, when city is chosen", () => {
//     const wrapper = shallow(<MapSection chosenCity="Nielepice" />);
//     expect(wrapper.exists("Connect(PollutionSideCard)")).toEqual(true);
//     expect(wrapper.exists("Connect(PollutionComparison)")).toEqual(false);
//   });

//   it("changes PollutionComparison component to PollutionSideCard when user choses city from the map", async () => {
//     const mockAdapter = new MockAdapter(axios);
//     mockGettingCurrentMeasurements(mockAdapter);
//     mockGettingOrganizationCurrentData(mockAdapter);
//     const wrapper = mount(
//       <Provider store={store}>
//         <MemoryRouter initialEntries={["/"]}>
//           <App />
//         </MemoryRouter>
//       </Provider>
//     );

//     await flushPromises();
//     wrapper.update();

//     const path = wrapper.find("path#Nielepice-map-path");
//     path.simulate("click");

//     expect(wrapper.find(".dropdown__control--placeholder").text()).toEqual(
//       "Nielepice"
//     );

//     const circle = wrapper.find("circle#Brzezinka-map-dot");
//     circle.simulate("click");
//     expect(wrapper.find(".dropdown__control--placeholder").text()).toEqual(
//       "Brzezinka"
//     );

//     const text = wrapper.find("text#Aleksandrowice-map-text");
//     text.simulate("click");
//     expect(wrapper.find(".dropdown__control--placeholder").text()).toEqual(
//       "Aleksandrowice"
//     );
//   });
// });
