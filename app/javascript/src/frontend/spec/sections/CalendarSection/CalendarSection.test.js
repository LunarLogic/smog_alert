import React from "react";
import { shallow } from "enzyme";

import { CalendarSection } from "../../../sections/CalendarSection/CalendarSection";
import mockCalendarStatusData from "../../__mocks__/calendarStatusDataMock.json";

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
      calendarStatusData={mockCalendarStatusData}
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
