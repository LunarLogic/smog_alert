import React from "react";
import { mount } from "enzyme";
import CalendarLegendBox from "../../../components/CalendarLegendBox/CalendarLegendBox";

describe("<CalendarLegendBox/>", () => {
  it("renders component with correct parameters", () => {
    const wrapperWithParameters = mount(
      <CalendarLegendBox
        backgroundColor={"blue"}
        status={"bardzo dobry"}
        numberOfDays={53}
      />
    );
    expect(
      wrapperWithParameters.find("StyledComponent").prop("backgroundColor")
    ).toEqual("blue");
    expect(wrapperWithParameters.find("span").text()).toEqual(
      "bardzo dobry:53 dni"
    );
  });
});
