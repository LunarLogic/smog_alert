import React from "react";
import { PollutionScale } from "../../../components/PollutionScale/PollutionScale";
import { mount } from "enzyme";

let wrapper1;
let wrapper2;

const mockChosenCityData1 = {
  last_hour_measurement: null
};

const mockChosenCityData2 = {
  last_hour_measurement: {
    status: "dobry"
  }
};

describe("...", () => {
  wrapper1 = mount(<PollutionScale chosenCityData={mockChosenCityData1} />);
  wrapper2 = mount(<PollutionScale chosenCityData={mockChosenCityData2} />);

  it("check if indicator is visible if last_hour_measurement data set to null", () => {
    expect(
      wrapper1
        .find(".scale__container")
        .children()
        .at(0)
        .props().opacity
    ).toEqual(0);

    expect(
      wrapper1
        .find(".scale__container")
        .children()
        .at(0)
        .props().indicator
    ).toEqual(null);
  });

  it("check if indicator is visible if last_hour_measurement data provided", () => {
    expect(
      wrapper2
        .find(".scale__container")
        .children()
        .at(0)
        .props().opacity
    ).toEqual(1);

    expect(
      wrapper2
        .find(".scale__container")
        .children()
        .at(0)
        .props().indicator
    ).toEqual(2);
  });
});
