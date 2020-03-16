import React from "react";
import { PollutionComparison } from "../../../components/PollutionComparison/PollutionComparison";
import citiesPollutionDataMock from "../../__mocks__/citiesPollutionDataMock.json";
import { mount } from "enzyme";

describe("PollutionComparison", () => {
  let wrapper;
  let chosenCity;
  let hoveredCity;

  beforeEach(() => {
    wrapper = mount(
      <PollutionComparison
        citiesPollutionData={citiesPollutionDataMock.data}
        getChosenCity={jest.fn(city => {
          chosenCity = city;
        })}
        getHoveredCity={jest.fn(city => {
          hoveredCity = city;
        })}
      />
    );
  });

  it("renders correct amount of PollutionBar components", () => {
    expect(wrapper.find(".pollution-bar").length).toEqual(4);
  });

  it("sorts PollutionBars in decreasing order", () => {
    expect(
      wrapper
        .find(".pollution-bar__info-location")
        .at(0)
        .text()
    ).toEqual("Brzoskwinia, Brzoskwinia");
    expect(
      wrapper
        .find(".pollution-bar__info-location")
        .at(1)
        .text()
    ).toEqual("Zabierzów, Wapienna");
    expect(
      wrapper
        .find(".pollution-bar__info-location")
        .at(2)
        .text()
    ).toEqual("Brzoskwinia, Brzoskwinia 186");
    expect(
      wrapper
        .find(".pollution-bar__info-location")
        .at(3)
        .text()
    ).toEqual("Aleksandrowice");
  });

  it("sets hoveredCity after user hovers over PollutionBar and removes it on mouse out", () => {
    wrapper
      .find(".pollution-bar")
      .at(0)
      .simulate("mouseOver");

    expect(hoveredCity).toEqual("Brzoskwinia");

    wrapper
      .find(".pollution-bar")
      .at(0)
      .simulate("mouseOut");

    expect(hoveredCity).toEqual("");
  });

  it("sets chosenCity when user clicks on a PollutionBar", () => {
    wrapper
      .find(".pollution-bar")
      .at(3)
      .simulate("click");
    expect(chosenCity).toEqual("Aleksandrowice");
  });

  it("displays loader when no data from store is received yet", () => {
    const wrapperEmpty = mount(
      <PollutionComparison
        citiesPollutionData={[]}
        getChosenCity={jest.fn(city => {
          chosenCity = city;
        })}
        getHoveredCity={jest.fn(city => {
          hoveredCity = city;
        })}
      />
    );
    expect(wrapperEmpty.find(".pollution-comparison__loader").exists()).toEqual(
      true
    );
  });

  const citiesPollutionDataPartiallyEmpty = [
    {
      location_id: 12,
      location_name: "Nielepice",
      location_street: "Józefa Trzaskowskiego",
      location_display_name: "Nielepice, Józefa Trzaskowskiego",
      lat: 50.096483,
      lng: 19.718281,
      last_hour_measurement: null
    },
    ...citiesPollutionDataMock.data
  ];

  const wrapperPartiallyEmpty = mount(
    <PollutionComparison
      citiesPollutionData={citiesPollutionDataPartiallyEmpty}
      getChosenCity={jest.fn(city => {
        chosenCity = city;
      })}
      getHoveredCity={jest.fn(city => {
        hoveredCity = city;
      })}
    />
  );
  it("sorts PollutionBars according to the pollution level, leaving ones with no measurement at the end", () => {
    expect(
      wrapperPartiallyEmpty
        .find("PollutionBar")
        .at(0)
        .prop("value")
    ).toBeGreaterThan(
      wrapperPartiallyEmpty
        .find("PollutionBar")
        .at(1)
        .prop("value")
    );
    expect(
      wrapperPartiallyEmpty
        .find("PollutionBar")
        .at(1)
        .prop("value")
    ).toBeGreaterThan(
      wrapperPartiallyEmpty
        .find("PollutionBar")
        .at(2)
        .prop("value")
    );
    expect(
      wrapperPartiallyEmpty
        .find("PollutionBar")
        .at(2)
        .prop("value")
    ).toBeGreaterThan(
      wrapperPartiallyEmpty
        .find("PollutionBar")
        .at(3)
        .prop("value")
    );
    expect(
      wrapperPartiallyEmpty
        .find("PollutionBar")
        .at(4)
        .prop("location")
    ).toEqual("Nielepice, Józefa Trzaskowskiego");
  });
});
