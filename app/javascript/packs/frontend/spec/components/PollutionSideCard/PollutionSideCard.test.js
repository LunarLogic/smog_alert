import React from "react";
import { PollutionSideCard } from "../../../components/PollutionSideCard/PollutionSideCard";
import citiesPollutionDataMock from "../../__mocks__/citiesPollutionDataMock.json";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";

describe("Pollution Side Card", () => {
  const chosenCityData = citiesPollutionDataMock.data.filter(
    city => city.location_name === "Brzoskwinia"
  );
  const chosenCityDataNoMeasurement = [
    {
      location_id: 16,
      location_name: "Brzoskwinia",
      location_street: "Brzoskwinia 186",
      location_display_name: "Brzoskwinia, Brzoskwinia 186",
      lat: 50.096481,
      lng: 19.718288,
      last_hour_measurement: null
    }
  ];
  let chosenCity;
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <PollutionSideCard
          chosenCityData={chosenCityData}
          getChosenCity={jest.fn(data => {
            chosenCity = data;
          })}
          chosenCity={chosenCity}
          citiesPollutionData={citiesPollutionDataMock.data}
        />
      </Provider>
    );
  });

  it("sets chosenCity to empty string when user clicks on return button", () => {
    wrapper.find(".side-pollution-card__return-button").simulate("click");
    expect(chosenCity).toEqual("");
  });

  it("renders correct amount of PollutionSpecificData components", () => {
    expect(wrapper.find("PollutionSpecificData").length).toEqual(
      chosenCityData.length
    );
  });
  it("displays correct data when no last hour measurement is provided", () => {
    const wrapperEmpty = mount(
      <Provider store={store}>
        <PollutionSideCard
          chosenCityData={chosenCityDataNoMeasurement}
          getChosenCity={jest.fn(data => {
            chosenCity = data;
          })}
          chosenCity={chosenCity}
          citiesPollutionData={citiesPollutionDataMock.data}
        />
      </Provider>
    );
    expect(wrapperEmpty.find("PollutionSpecificData").length).toEqual(1);
    expect(wrapperEmpty.find("PollutionSpecificData").prop("status")).toEqual(
      "brak pomiaru"
    );
    expect(wrapperEmpty.find("PollutionSpecificData").prop("data")).toEqual([
      { name: "PM 10", value: null },
      { name: "PM 2.5", value: null }
    ]);
  });
});
