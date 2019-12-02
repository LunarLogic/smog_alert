import React from "react";
import { mount } from "enzyme";
import Dot from "../../../components/Dot/Dot";

describe("<Dot />", () => {
  it("sets class name", () => {
    const wrapper = mount(<Dot className="Burów" />);
    expect(wrapper.find("div").hasClass("Burów")).toEqual(true);
  });
  it("sets background color", () => {
    const wrapper = mount(<Dot backgroundColor="#7d0d0f" />);
    expect(wrapper.find("div").prop("style")).toHaveProperty(
      "backgroundColor",
      "#7d0d0f"
    );
  });
});
