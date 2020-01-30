import React from "react";
import { shallow } from "enzyme";
import { MapSection } from "../../../sections/MapSection/MapSection";

describe("Map section", () => {
  it("renders PollutionComparison component, when no city is chosen", () => {
    const wrapper = shallow(<MapSection chosenCity="" />);
    expect(wrapper.exists("Connect(PollutionComparison)")).toEqual(true);
    expect(wrapper.exists("Connect(PollutionSideCard)")).toEqual(false);
  });

  it("renders PollutionSideCard component, when city is chosen", () => {
    const wrapper = shallow(<MapSection chosenCity="Nielepice" />);
    expect(wrapper.exists("Connect(PollutionSideCard)")).toEqual(true);
    expect(wrapper.exists("Connect(PollutionComparison)")).toEqual(false);
  });
});
