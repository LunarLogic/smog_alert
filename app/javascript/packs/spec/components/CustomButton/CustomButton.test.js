import React from "react";
import { mount } from "enzyme";
import CustomButton from "../../../components/CustomButton/CustomButton";

describe("<CustomButton />", () => {
  it("displays given text", () => {
    const wrapper = mount(<CustomButton text="Button" />);
    expect(wrapper.text()).toBe("Button");
  });
});
