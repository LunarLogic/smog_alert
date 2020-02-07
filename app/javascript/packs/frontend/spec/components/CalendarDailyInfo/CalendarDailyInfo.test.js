import React from "react";
import { mount } from "enzyme";
import { CalendarDailyInfo } from "../../../components/CalendarDailyInfo/CalendarDailyInfo";

describe("<CalendarDailyInfo/>", () => {
  const mockCalendarValues = {
    year: 2020,
    daily_average_measurements: [
      {
        day: "2020-02-02",
        pm10: 100,
        pm25: 25,
        number_of_measurements: 18
      }
    ]
  };

  it("component is correctly rendered when data for a chosen year is available", () => {
    const mockCalendarChosenDay = "2020-02-02";
    const wrapper = mount(
      <CalendarDailyInfo
        calendarChosenDay={mockCalendarChosenDay}
        calendarValues={mockCalendarValues}
      />
    );
    console.log(wrapper.text());
    expect(wrapper.text().includes("Dzień:2020-02-02")).toBe(true);
    expect(wrapper.text().includes("pm 10:100")).toBe(true);
    expect(wrapper.text().includes("pm 2.5:25")).toBe(true);
    expect(wrapper.text().includes("liczba pomiarów:18")).toBe(true);
  });
  it("component is correctly rendered when data for a chosen year is not available", () => {
    const mockCalendarChosenDay = "2020-02-01";
    const wrapper = mount(
      <CalendarDailyInfo
        calendarChosenDay={mockCalendarChosenDay}
        calendarValues={mockCalendarValues}
      />
    );
    expect(wrapper.text().includes("Dzień:[ Kliknij na wybrany dzień ]")).toBe(
      true
    );
    expect(wrapper.text().includes("pm 10:--μg")).toBe(true);
    expect(wrapper.text().includes("pm 2.5:--μg")).toBe(true);
    expect(wrapper.text().includes("liczba pomiarów:--")).toBe(true);
  });
});
