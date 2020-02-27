import React from "react";
import { mount } from "enzyme";
import { CalendarDailyInfo } from "../../../components/CalendarDailyInfo/CalendarDailyInfo";

describe("<CalendarDailyInfo/>", () => {
  const mockCalendarDailyValues = {
    date: "2020-02-02",
    number_of_measurements: 18,
    average_values: [
      {
        name: "pm10",
        value: "100"
      },
      {
        name: "pm25",
        value: "25"
      }
    ],
    status: "bardzo dobry"
  };
  const mockCalendarDailyValuesNoData = {
    date: "2020-02-02",
    number_of_measurements: 0,
    average_values: [
      {
        name: "pm10",
        value: null
      },
      {
        name: "pm25",
        value: null
      }
    ],
    status: "zbyt mało danych"
  };
  const mockGetCalendarDailyValuesData = jest.fn(() => {
    mockCalendarDailyValues;
  });

  it("component is correctly rendered when data for a chosen day is available", () => {
    const mockCalendarChosenDay = "2020-02-02";
    const wrapper = mount(
      <CalendarDailyInfo
        getCalendarDailyValuesData={mockGetCalendarDailyValuesData}
        calendarChosenDay={mockCalendarChosenDay}
        calendarDailyValues={mockCalendarDailyValues}
        calendarChosenCityIndex={19}
      />
    );
    expect(wrapper.text().includes("Dzień:2020-02-02")).toBe(true);
    expect(wrapper.text().includes("pm10:100")).toBe(true);
    expect(wrapper.text().includes("pm25:25")).toBe(true);
    expect(wrapper.text().includes("liczba pomiarów:18")).toBe(true);
  });
  it("component is correctly rendered when data for a chosen day is not available", () => {
    const mockCalendarChosenDay = "2020-02-02";
    const wrapper = mount(
      <CalendarDailyInfo
        getCalendarDailyValuesData={mockGetCalendarDailyValuesData}
        calendarChosenDay={mockCalendarChosenDay}
        calendarDailyValues={mockCalendarDailyValuesNoData}
        calendarChosenCityIndex={19}
      />
    );
    expect(wrapper.text().includes("Dzień:2020-02-02")).toBe(true);
    expect(wrapper.text().includes("pm10:--μg")).toBe(true);
    expect(wrapper.text().includes("pm25:--μg")).toBe(true);
    expect(wrapper.text().includes("liczba pomiarów:0")).toBe(true);
  });
});
