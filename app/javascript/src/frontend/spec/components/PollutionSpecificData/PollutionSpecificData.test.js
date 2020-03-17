import React from "react";
import { mount } from "enzyme";
import { PollutionSpecificData } from "../../../components/PollutionSpecificData/PollutionSpecificData";
import citiesPollutionDataMock from "../../__mocks__/citiesPollutionDataMock.json";

describe("PollutionSpecificData", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <PollutionSpecificData
        display_name="Nielepice"
        color="#ffffff"
        lastHourMeasurement={
          citiesPollutionDataMock.data[0].lastHourMeasurement
        }
        status={citiesPollutionDataMock.data[0].last_hour_measurement.status}
        data={citiesPollutionDataMock.data[0].last_hour_measurement.values}
      />
    );
  });
  it("displays given location", () => {
    expect(
      wrapper.find(".pollution-specific-data__label--bold").text()
    ).toEqual("Nielepice");
  });

  it("displays given pollution status", () => {
    expect(
      wrapper
        .find(".pollution-specific-data__info--overview")
        .children()
        .at(1)
        .text()
    ).toEqual("zły");

    const wrapperNoMeasurement = mount(
      <PollutionSpecificData
        display_name="Nielepice"
        color="#ffffff"
        lastHourMeasurement={null}
        status={null}
        data={[]}
      />
    );
    expect(
      wrapperNoMeasurement
        .find(".pollution-specific-data__info--overview")
        .children()
        .at(1)
        .text()
    ).toEqual("brak pomiaru");
  });

  it("displays correct amount of PollutionIndexData with correct data", () => {
    const pollutionIndexData = wrapper.find("PollutionIndexData");
    const indicator = pollutionIndexData.find(
      ".pollution-index-data__info-indicator"
    );
    const value = pollutionIndexData.find(".pollution-index-data__info-value");
    const percent = pollutionIndexData.find(
      ".pollution-index-data__info-percent"
    );
    const limit = pollutionIndexData.find(".pollution-index-data__limit");

    expect(pollutionIndexData.length).toEqual(2);

    expect(indicator.at(0).text()).toEqual("PM 10");
    expect(value.at(0).text()).toContain("116.92");
    expect(percent.at(0).text()).toContain("234");
    expect(limit.at(0).text()).toContain("PM 10");
    expect(limit.at(0).text()).toContain("50");

    expect(indicator.at(1).text()).toEqual("PM 2.5");
    expect(value.at(1).text()).toContain("68.61");
    expect(percent.at(1).text()).toContain("274");
    expect(limit.at(1).text()).toContain("PM 2.5");
    expect(limit.at(1).text()).toContain("25");
  });
});
