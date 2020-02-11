import React from "react";
import { shallow } from "enzyme";

import { CalendarSection } from "../../../sections/CalendarSection/CalendarSection";
import calendarStatusDataMock from "../../__mocks__/calendarStatusDataMock";

describe("<CalendarSection/>", () => {
  let mockCalendarChosenYear = 2019;
  let mockCalendarChosenCity = "Zabierzów, Wapienna";
  const mockCitiesList = ["Aleksandrowice", "Balice", "Zabierzów, Wapienna"];

  const wrapper = shallow(
    <CalendarSection
      getCalendarStatusData={jest.fn(() => {})}
      setCalendarChosenCity={jest.fn(
        chosenCity => (mockCalendarChosenCity = chosenCity)
      )}
      calendarStatusData={calendarStatusDataMock}
      calendarChosenYear={mockCalendarChosenYear}
      calendarChosenCity={mockCalendarChosenCity}
      calendarChosenCityIndex={19}
      citiesList={mockCitiesList}
    />
  );

  it("components renders correctly with all nested components", () => {
    expect(wrapper.exists("DropdownMenu")).toEqual(true);
    expect(wrapper.exists("Connect(CalendarDailyInfo)")).toEqual(true);
    expect(wrapper.exists("Connect(Calendar)")).toEqual(true);
    expect(wrapper.exists("CalendarLegendBox")).toEqual(true);
  });
});
