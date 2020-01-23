import React from "react";
import {
  DropdownMenu,
  dropdownMenuHelpers
} from "../../../components/DropdownMenu/DropdownMenu";
import { mount } from "enzyme";
import citiesPollutionDataMock from "../../__mocks__/citiesPollutionDataMock.json";

describe("Dropdown menu", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <DropdownMenu
        citiesPollutionData={citiesPollutionDataMock.data}
        chosenCity="Nielepice"
        getChosenCity={jest.fn()}
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
    expect(wrapper.find(".dropdown__control--menu-option").length).toEqual(
      citiesPollutionDataMock.data.length
    );
  });

  it("opens and closes dropdown menu", () => {
    wrapper.find(".dropdown__control").simulate("click");
    expect(
      wrapper.find(".dropdown__control--menu-option").length
    ).toBeGreaterThan(0);
    wrapper.find(".dropdown__control").simulate("click");
    expect(wrapper.find(".dropdown__control--menu-option").length).toEqual(0);
  });

  it("sets chosen city after user checks it from the dropdown", () => {
    const changeChosenCity = jest.spyOn(
      dropdownMenuHelpers,
      "changeChosenCity"
    );
    wrapper.find(".dropdown__control").simulate("click");
    wrapper
      .find(".dropdown__control--menu-option")
      .at(0)
      .simulate("click");
    expect(wrapper.find(".dropdown__control--menu-option").length).toEqual(0);
    expect(changeChosenCity).toHaveBeenCalledWith(
      "Brzoskwinia",
      expect.any(Function),
      expect.any(Function)
    );
  });
});
