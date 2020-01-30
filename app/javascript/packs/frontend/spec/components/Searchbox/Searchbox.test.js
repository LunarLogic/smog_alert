import React from "react";
import { mount } from "enzyme";
import { Searchbox } from "../../../components/Searchbox/Searchbox";

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
    expect(wrapper.find("li")).toHaveLength(0);
    input.simulate("focus");
    expect(wrapper.find("li")).toHaveLength(4);
  });

  it("should render list with options filtered by the input value", () => {
    input.simulate("focus");
    input.simulate("change", { target: { value: "Brze" } });
    expect(wrapper.find("li")).toHaveLength(2);
  });

  it("should set input value to the one typed in and after choosing an option from list it should clear out", () => {
    input.simulate("focus");
    input.simulate("change", { target: { value: "Nie" } });
    expect(wrapper.find("input").props().value).toEqual("Nie");
    wrapper.find("li").simulate("click");
    expect(location).toBe("Nielepice"); // checks additionally whether dispatch is called and returns correct value;
    expect(wrapper.find("input").props().value).toEqual("");
  });
});
