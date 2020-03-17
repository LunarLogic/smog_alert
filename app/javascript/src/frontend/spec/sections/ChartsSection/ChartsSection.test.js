import React from "react";
import { shallow } from "enzyme";

import { ChartsSection } from "../../../sections/ChartsSection/ChartsSection";

describe("<ChartsSection/>", () => {
  let mockChartChosenCity = "Zabierzów, Wapienna";
  let mockChartChosenIndicator = "PM 2.5";
  const mockCitiesList = ["Aleksandrowice", "Balice", "Zabierzów, Wapienna"];
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ChartsSection
        citiesList={mockCitiesList}
        chartChosenCity={mockChartChosenCity}
        chartChosenIndicator={mockChartChosenIndicator}
        setChartChosenCity={jest.fn(
          chosenCity => (mockChartChosenCity = chosenCity)
        )}
        setChartChosenIndicator={jest.fn(
          chosenIndicator => (mockChartChosenIndicator = chosenIndicator)
        )}
        getChartHourlyAverageForMonthData={jest.fn(() => {})}
        chartChosenCityIndex={26}
      />
    );
  });

  it("shows correct chosen indicator information in subtitle", () => {
    expect(
      wrapper
        .find(".charts-section__subheading--bold")
        .at(0)
        .text()
    ).toEqual("PM 10");
    wrapper.find(".charts-section__submit").simulate("click");
    expect(
      wrapper
        .find(".charts-section__subheading--bold")
        .at(0)
        .text()
    ).toEqual("PM 2.5");
  });

  it("passes correct indicator parameter value to Chart component", () => {
    expect(wrapper.find("Connect(Chart)").prop("indicator")).toEqual("PM 10");
    wrapper.find(".charts-section__submit").simulate("click");
    expect(wrapper.find("Connect(Chart)").prop("indicator")).toEqual("PM 2.5");
  });
});
