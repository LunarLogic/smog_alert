import React from "react";
import { PollutionCard } from "../../../components/PollutionCard/PollutionCard";
import { mount, shallow } from "enzyme";

describe("Pollution Card component", () => {
  let wrapper1;
  let wrapper2;
  let wrapper3;

  const mockChosenCityData1 = {
    location_id: 16,
    location_name: "Nielepice",
    location_street: "Józefa Trzaskowskiego",
    location_display_name: "Nielepice, Józefa Trzaskowskiego",
    lat: 50.10684,
    lng: 19.70766,
    last_hour_measurement: null
  };

  const mockChosenCityData2 = {
    location_id: 16,
    location_name: "Nielepice",
    location_street: "Józefa Trzaskowskiego",
    location_display_name: "Nielepice, Józefa Trzaskowskiego",
    lat: 50.10684,
    lng: 19.70766,
    last_hour_measurement: {
      from_date_time: "2020-01-20T12:00:06.942Z",
      till_date_time: "2020-01-20T13:00:06.942Z",
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
      status: "dobry",
      advice: "Green, green, green!"
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
    console.log(wrapper3.debug());
    expect(wrapper3.children.length).toEqual(1);
  });
});
