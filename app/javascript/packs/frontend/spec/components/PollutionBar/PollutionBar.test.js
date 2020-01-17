import React from "react";
import { mount, shallow } from "enzyme";
import toJson from "enzyme-to-json";

import PollutionBar from "../../../components/PollutionBar/PollutionBar";

describe("<PollutionBar />", () => {
  it("displays given props data", () => {
    const wrapper = mount(
      <PollutionBar
        location="Brzezie"
        value={25}
        width={30}
        backgroundColor="#7d0d0f"
      />
    );
    expect(wrapper.find("div.pollution-bar__info-location").text()).toBe(
      "Brzezie"
    );
    expect(wrapper.find("div.pollution-bar__info-value").text()).toBe(
      "25 μg/m³"
    );
    expect(wrapper.find("div.pollution-bar__bar").prop("style")).toHaveProperty(
      "width",
      "30%"
    );
    expect(wrapper.find("div.pollution-bar__bar").prop("style")).toHaveProperty(
      "backgroundColor",
      "#7d0d0f"
    );
  });
  it("expect to render PollutionBar component", () => {
    const wrapper = shallow(
      <PollutionBar
        location="Brzezie"
        value={25}
        width={30}
        backgroundColor="#7d0d0f"
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
