// TODO:
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, screen } from "@testing-library/react";
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
  const mockAdapter = new MockAdapter(axios);

  mockGettingCurrentMeasurements(mockAdapter);
  mockGettingArticles(mockAdapter);
  mockGettingOrganizationCurrentData(mockAdapter);
  mockGettingCalendarValuesData(mockAdapter);
  mockGettingCalendarStatusData(mockAdapter);
  mockGettingFirstMonthData(mockAdapter);
  mockGettingHourlyAverageForMothData(mockAdapter);

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

  it("renders correct page when user is on homepage", async () => {
    await flushPromises();
    expect(
      await screen.findByText(/aktualna jakość powietrza/i)
    ).toBeInTheDocument();
  });

  it("renders correct page when user chooses news from navigation", async () => {
    await flushPromises();

    fireEvent.click(screen.getAllByText(/aktualności/i)[0]);
    expect(
      await screen.findByText(/Consequatur quisquam reprehenderit sequi/i)
    ).toBeInTheDocument();
  });

  it("renders correct page when user chooses myths from navigation", async () => {
    await flushPromises();

    fireEvent.click(screen.getAllByText(/czym oddycham/i)[0]);
    expect(await screen.findByText(/obalamy mity/i)).toBeInTheDocument();
  });

  it("renders correct page when user chooses solutions from navigation", async () => {
    await flushPromises();

    fireEvent.click(screen.getAllByText(/rozwiązania/i)[0]);
    expect(
      await screen.findByText(/sprawdź jakie kroki możesz podjąć/i)
    ).toBeInTheDocument();
  });

  it("renders correct page when user chooses calendar from navigation", async () => {
    await flushPromises();

    fireEvent.click(screen.getAllByText(/statystyki/i)[0]);
    expect(await screen.findByText(/kalendarz/i)).toBeInTheDocument();
  });

  it("renders correct page when user chooses change furnance from navigation", async () => {
    await flushPromises();

    fireEvent.click(screen.getAllByText(/zmień piec/i)[0]);
    expect(await screen.findByText(/wymień kocioł/i)).toBeInTheDocument();
  });
});
