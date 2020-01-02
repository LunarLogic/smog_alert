import React from "react";
import { mount } from "enzyme";
import ContactDetail from "../../../components/ContactDetail/ContactDetail";

describe("<ContactDetail />", () => {
  it("displays contact detail with default icon", () => {
    const wrapper = mount(<ContactDetail item="email@gmail.com" />);
    expect(wrapper.text()).toBe("email@gmail.com");
  });
});
