// TODO:
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../../../App";

import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Provider } from "react-redux";

import {
  mockGettingCurrentMeasurements,
  mockGettingOrganizationCurrentData,
  mockGettingArticles,
  mockGettingCalendarValuesData,
  mockGettingFirstMonthData,
  mockGettingHourlyAverageForMothData,
  mockGettingCalendarStatusData
} from "../../helpers/mockHelpers";
import flushPromises from "../../helpers/flushPromises";
import { store } from "../../../redux/store";

describe("Navigation component", () => {
  it("renders correct page when user chooses option from navigation", async () => {
    const mockAdapter = new MockAdapter(axios);

    mockGettingCurrentMeasurements(mockAdapter);
    mockGettingArticles(mockAdapter);
    mockGettingOrganizationCurrentData(mockAdapter);
    mockGettingCalendarValuesData(mockAdapter);
    mockGettingCalendarStatusData(mockAdapter);
    mockGettingFirstMonthData(mockAdapter);
    mockGettingHourlyAverageForMothData(mockAdapter);

    const history = createMemoryHistory();

    const { findByText, getAllByText } = render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    await flushPromises();

    expect(await findByText(/aktualna jakość powietrza/i)).toBeInTheDocument();

    fireEvent.click(getAllByText(/aktualności/i)[0]);
    expect(
      await findByText(/Consequatur quisquam reprehenderit sequi/i)
    ).toBeInTheDocument();

    fireEvent.click(getAllByText(/czym oddycham/i)[0]);
    expect(await findByText(/obalamy mity/i)).toBeInTheDocument();

    fireEvent.click(getAllByText(/rozwiązania/i)[0]);
    expect(
      await findByText(/sprawdź jakie kroki możesz podjąć/i)
    ).toBeInTheDocument();

    fireEvent.click(getAllByText(/statystyki/i)[0]);
    expect(await findByText(/kalendarz/i)).toBeInTheDocument();

    fireEvent.click(getAllByText(/zmień piec/i)[0]);
    expect(await findByText(/wymień kocioł/i)).toBeInTheDocument();
  });
});
