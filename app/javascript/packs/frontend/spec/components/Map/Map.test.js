import React from "react";
import { mount } from "enzyme";
import { Map } from "../../../components/Map/Map.js";
import citiesPollutionDataMock from "../../__mocks__/citiesPollutionDataMock.json";
import mapElements from "../../../components/Map/MapElements";

describe("Map", () => {
  it("renders correct amount of path elements", () => {
    const wrapper = mount(
      <Map
        citiesPollutionData={citiesPollutionDataMock.data}
        chosenCity="Nielepice"
        getChosenCity={jest.fn()}
        hoveredCity="Brzoskwinia"
        getHoveredCity={jest.fn()}
      />
    );

    expect(wrapper.find("path").length).toEqual(mapElements.length);
  });
});
