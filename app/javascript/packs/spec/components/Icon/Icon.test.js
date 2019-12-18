import React from "react";
import { mount } from "enzyme";
import Icon from "../../../components/Icon/Icon";

describe("<Icon />", () => {
  it("sets icon image and message", () => {
    const wrapper = mount(<Icon iconId="id2" />);
    expect(
      wrapper.find("div.icon__content").hasClass("icon__content--forbidden")
    ).toEqual(true);
    expect(wrapper.find("div.icon__text").text()).toBe("Nie otwieraj okien");
  });
});
