import React from "react";
import { PollutionCard } from "../../../components/PollutionCard/PollutionCard";
import { mount } from "enzyme";

describe("Pollution Card component", () => {
  let wrapper1;
  let wrapper2;
  let wrapper3;

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

  beforeEach(() => {
    wrapper1 = mount(<PollutionCard chosenCityData={mockChosenCityData1} />);
    wrapper2 = mount(<PollutionCard chosenCityData={mockChosenCityData2} />);
    wrapper3 = mount(<PollutionCard chosenCityData={mockChosenCityData3} />);
  });

  it("Check if component renders correctly even though no data for last_hour_measurement has been provided", () => {
    expect(
      wrapper1
        .find(".card-pollution__current-data-specific-primary-value--bold")
        .text()
    ).toEqual("--");
  });

  it("Check if component renders correctly with last_hour_measurement data provided", () => {
    expect(
      wrapper2
        .find(".card-pollution__current-data-specific-primary-value--bold")
        .text()
    ).toEqual("23");
  });

  it("Check how component behaves with no data provided at all", () => {
    expect(
      wrapper3.find(".card-pollution__current-data-container").children()
    ).toHaveLength(0);
  });
});
