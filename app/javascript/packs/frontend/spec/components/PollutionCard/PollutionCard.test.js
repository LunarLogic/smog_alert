import React from "react";
import { PollutionCard } from "../../../components/PollutionCard/PollutionCard";
import { mount } from "enzyme";

describe("Pollution Card component", () => {
  let wrapper;

  const mockChosenCityData1 = {
    last_hour_measurement: null
  };

  const mockChosenCityData2 = {
    last_hour_measurement: {
      values: [
        {
          name: "PM 10",
          value: 23.44
        },
        {
          name: "PM 2.5",
          value: 13.24
        }
      ],
      status: "dobry"
    }
  };

  const mockChosenCityData3 = undefined;

  it("Check if component renders correctly even though no data for last_hour_measurement has been provided", () => {
    wrapper = mount(<PollutionCard chosenCityData={mockChosenCityData1} />);
    expect(
      wrapper
        .find(".card-pollution__current-data-specific-primary-value--bold")
        .text()
    ).toEqual("--");
  });

  it("Check if component renders correctly with last_hour_measurement data provided", () => {
    wrapper = mount(<PollutionCard chosenCityData={mockChosenCityData2} />);
    expect(
      wrapper
        .find(".card-pollution__current-data-specific-primary-value--bold")
        .text()
    ).toEqual("23");
  });

  it("Check how component behaves with no data provided at all", () => {
    wrapper = mount(<PollutionCard chosenCityData={mockChosenCityData3} />);
    expect(
      wrapper.find(".card-pollution__current-data-container").children()
    ).toHaveLength(0);
  });
});
