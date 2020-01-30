import React from "react";
import { PollutionCard } from "../../../components/PollutionCard/PollutionCard";
import { mount } from "enzyme";

describe("Pollution Card component", () => {
  let wrapper;

  const mockChosenCityWithoutLastHourMeasurementData = {
    last_hour_measurement: null
  };

  const mockChosenCityWithLastHourMeasurementData = {
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

  it("Check if component renders correctly even though no data for last_hour_measurement has been provided", () => {
    wrapper = mount(
      <PollutionCard
        chosenCityData={mockChosenCityWithoutLastHourMeasurementData}
      />
    );
    expect(
      wrapper
        .find(".card-pollution__current-data-specific-primary-value--bold")
        .text()
    ).toEqual("--");
  });

  it("Check if component renders correctly with last_hour_measurement data provided", () => {
    wrapper = mount(
      <PollutionCard
        chosenCityData={mockChosenCityWithLastHourMeasurementData}
      />
    );
    expect(
      wrapper
        .find(".card-pollution__current-data-specific-primary-value--bold")
        .text()
    ).toEqual("23");
  });

  it("Check how component behaves with no data provided at all", () => {
    wrapper = mount(<PollutionCard chosenCityData={undefined} />);
    expect(
      wrapper.find(".card-pollution__current-data-container").children()
    ).toHaveLength(0);
  });
});
