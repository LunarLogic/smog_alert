import React from "react";
import { mount } from "enzyme";
import PollutionBar from "../../../components/PollutionBar/PollutionBar";

describe("<PollutionBar />", () => {
  it("displays given location", () => {
    const wrapper = mount(<PollutionBar location="Brzezie" />);
    expect(wrapper.find("div.pollution-bar__info-location").text()).toBe(
      "Brzezie"
    );
  });
  it("displays given value", () => {
    const wrapper = mount(<PollutionBar value={25} />);
    expect(wrapper.find("div.pollution-bar__info-value").text()).toBe(
      " 25 μg/m³"
    );
  });
  it("sets given width", () => {
    const wrapper = mount(<PollutionBar width={30} />);
    expect(wrapper.find("div.pollution-bar__bar").prop("style")).toHaveProperty(
      "width",
      "30%"
    );
  });
  it("sets given color", () => {
    const wrapper = mount(<PollutionBar backgroundColor="#7d0d0f" />);
    expect(wrapper.find("div.pollution-bar__bar").prop("style")).toHaveProperty(
      "backgroundColor",
      "#7d0d0f"
    );
  });
});
