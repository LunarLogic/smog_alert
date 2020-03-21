import React from "react";
import { DropdownMenu } from "../../../components/DropdownMenu/DropdownMenu";
import { mount } from "enzyme";

describe("Dropdown menu", () => {
  let wrapper;
  let chosenCity;
  let cityListMockData = [
    "Aleksandrowice",
    "Brzoskwinia",
    "Nielepice",
    "Zabierzów",
    "Zelków"
  ];
  beforeEach(() => {
    wrapper = mount(
      <DropdownMenu
        optionsList={cityListMockData}
        chosenCityToBeDisplayed={chosenCity ? chosenCity : "Nielepice"}
        handleChosenCity={jest.fn(city => {
          chosenCity = city;
        })}
      />
    );
  });

  it("displays correct city in the menu placeholder", () => {
    expect(wrapper.find(".dropdown__control--placeholder").text()).toEqual(
      "Nielepice"
    );
  });

  it("displays correct amount of cities in dropdown", () => {
    wrapper.find(".dropdown__control").simulate("click");
    expect(wrapper.find(".dropdown__control--menu-option").length).toEqual(5);
  });

  it("opens and closes dropdown menu", () => {
    wrapper.find(".dropdown__control").simulate("click");
    expect(
      wrapper.find(".dropdown__control--menu-option").length
    ).toBeGreaterThan(0);

    wrapper.find(".dropdown__control").simulate("click");
    expect(wrapper.find(".dropdown__control--menu-option").length).toEqual(0);
  });

  it("sorts all the cities in dropdown in alphabetical order", () => {
    wrapper.find(".dropdown__control").simulate("click");
    expect(
      wrapper
        .find(".dropdown__control--menu-option")
        .at(0)
        .text()
    ).toEqual("Aleksandrowice");
    expect(
      wrapper
        .find(".dropdown__control--menu-option")
        .at(1)
        .text()
    ).toEqual("Brzoskwinia");
  });

  it("sets chosen city after user chooses it from the dropdown", () => {
    wrapper.find(".dropdown__control").simulate("click");
    wrapper
      .find(".dropdown__control--menu-option")
      .at(0)
      .simulate("click");

    expect(wrapper.find(".dropdown__control--menu-option").length).toEqual(0);

    expect(chosenCity).toEqual("Aleksandrowice");
    wrapper.setProps({ chosenCityToBeDisplayed: chosenCity });
    expect(wrapper.find(".dropdown__control--placeholder").text()).toEqual(
      "Aleksandrowice"
    );
  });
});
