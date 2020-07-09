import React from "react";
import { mount } from "enzyme";
import ContactDetail from "../../../components/ContactDetail/ContactDetail";

// using enzyme
describe("<ContactDetail />", () => {
  it("displays contact detail with default icon", () => {
    const wrapper = mount(<ContactDetail item="email@gmail.com" />);
    expect(wrapper.text()).toBe("email@gmail.com");
  });
});

import { render, screen } from "@testing-library/react";

// using react-testing-library
describe("<ContactDetail />", () => {
  it("displays contact detail with default icon", () => {
    render(<ContactDetail item="email@gmail.com" />);
    screen.debug(screen.getByText("email@gmail.com"));
    expect(screen.getByText("email@gmail.com")).toBeTruthy();
  });
});
