import React from "react";
import { mount } from "enzyme";
import { Map } from "../../../components/Map/Map.js";
import citiesPollutionDataMock from "../../__mocks__/citiesPollutionDataMock.json";
import mapElements from "../../../components/Map/MapElements";

describe("Map", () => {
  let wrapper;
  let chosenCity;
  let hoveredCity;

  beforeEach(() => {
    wrapper = mount(
      <Map
        citiesPollutionData={citiesPollutionDataMock.data}
        chosenCity={chosenCity ? chosenCity : "Nielepice"}
        getChosenCity={jest.fn(city => {
          chosenCity = city;
        })}
        hoveredCity={hoveredCity ? hoveredCity : "Nielepice"}
        getHoveredCity={jest.fn(city => {
          hoveredCity = city;
        })}
      />
    );
  });

  it("renders correct amount of path elements", () => {
    expect(wrapper.find("path").length).toEqual(mapElements.length);
  });

  it("renders correct amount of text elements", () => {
    expect(wrapper.find("text").length).toEqual(mapElements.length);
  });

  it("renders correct amount of cicrcle elements", () => {
    expect(wrapper.find("circle").length).toEqual(mapElements.length);
  });

  it("sets hoveredCity when user hovers over map elements and removes it on mouse out", () => {
    wrapper.find("path#Aleksandrowice-map-path").simulate("mouseOver");
    expect(hoveredCity).toEqual("Aleksandrowice");
    wrapper.find("path#Aleksandrowice-map-path").simulate("mouseOut");
    expect(hoveredCity).toEqual("");

    wrapper.find("text#Brzoskwinia-map-text").simulate("mouseOver");
    expect(hoveredCity).toEqual("Brzoskwinia");
    wrapper.find("text#Brzoskwinia-map-text").simulate("mouseOut");
    expect(hoveredCity).toEqual("");

    wrapper.find("circle#Aleksandrowice-map-dot").simulate("mouseOver");
    expect(hoveredCity).toEqual("Aleksandrowice");
    wrapper.find("circle#Aleksandrowice-map-dot").simulate("mouseOut");
    expect(hoveredCity).toEqual("");
  });

  it("sets chosenCity when user clicks on map element", () => {
    wrapper.find("path#Aleksandrowice-map-path").simulate("click");
    expect(chosenCity).toEqual("Aleksandrowice");

    wrapper.find("text#Brzoskwinia-map-text").simulate("click");
    expect(chosenCity).toEqual("Brzoskwinia");

    wrapper.find("circle#Aleksandrowice-map-dot").simulate("click");
    expect(chosenCity).toEqual("Aleksandrowice");
  });
});
