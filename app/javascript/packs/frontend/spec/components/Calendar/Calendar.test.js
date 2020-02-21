import React from "react";
import { mount } from "enzyme";
import { Calendar } from "../../../components/Calendar/Calendar";
import mockCalendarStatusData from "../../__mocks__/calendarStatusDataMock.json";

describe("<Calendar/>", () => {
  let mockCalendarChosenYear = 2018;
  let mockCalendarChosenDay;
  const mockSetCalendarChosenYear = jest.fn(chosenYear => {
    mockCalendarChosenYear = chosenYear;
  });
  const mockSetCalendarChosenDay = jest.fn(chosenDay => {
    mockCalendarChosenDay = chosenDay;
  });
  it("onClick functions (on day and on year) work correctly returning assumed value", () => {
    const wrapper = mount(
      <Calendar
        setCalendarChosenYear={mockSetCalendarChosenYear}
        setCalendarChosenDay={mockSetCalendarChosenDay}
        calendarChosenYear={mockCalendarChosenYear}
        calendarStatusData={mockCalendarStatusData}
      />
    );
    wrapper
      .find(".control")
      .at(0)
      .simulate("click");
    expect(mockCalendarChosenYear).toEqual(2017);
    wrapper
      .find(".day-number")
      .at(0)
      .simulate("click");
    expect(mockSetCalendarChosenDay).toHaveBeenCalled();
  });
});
