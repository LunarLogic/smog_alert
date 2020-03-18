import React from "react";
import { mount } from "enzyme";
import { Searchbox } from "../../../components/Searchbox/Searchbox";
import simulateSearchboxChange from "../../helpers/simulateSearchboxChange";

describe("Searchbox component", () => {
  let wrapper;
  let mockSetChosenCity;
  let input;
  let location;

  const mockCities = ["Nielepice", "Zabierzów", "Brzezie", "Brzezinka"];

  beforeEach(() => {
    mockSetChosenCity = jest.fn(city => {
      return (location = city);
    });

    const mockProps = {
      cities: mockCities,
      setChosenCity: mockSetChosenCity
    };

    wrapper = mount(<Searchbox {...mockProps} />);
    input = wrapper.find("input");
  });

  it("on focus should render list with all options", () => {
    expect(wrapper.find("Option")).toHaveLength(0);
    input.simulate("change");
    expect(wrapper.find("Option")).toHaveLength(4);
  });

  it("should render list with options filtered by the input value", () => {
    simulateSearchboxChange(wrapper, "Brze");
    expect(wrapper.find("Option")).toHaveLength(2);
  });

  it("should set input value to the one typed in and after choosing an option from list it should clear out", () => {
    simulateSearchboxChange(wrapper, "Nie");

    expect(wrapper.find("input").props().value).toEqual("Nie");
    wrapper.find("Option").simulate("click");
    expect(location).toBe("Nielepice"); // checks additionally whether dispatch is called and returns correct value;
    expect(wrapper.find("input").props().value).toEqual("");
  });
});
