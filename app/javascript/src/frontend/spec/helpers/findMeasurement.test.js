import { findMeasurement } from "../../helpers";

describe("findMeasurement helper function", () => {
  let indicator;
  let cityData;
  it("returns correct value even though null provided", () => {
    indicator = "PM 10";
    expect(
      findMeasurement(
        {
          last_hour_measurement: null
        },
        indicator
      )
    ).toEqual({ value: "--" });
  });
  it("returns correct value", () => {
    cityData = {
      last_hour_measurement: {
        values: [
          {
            name: "PM 10",
            value: "33"
          },
          {
            name: "PM 2.5",
            value: "20"
          }
        ]
      }
    };

    expect(findMeasurement(cityData, "PM 10")).toEqual({
      name: "PM 10",
      value: "33"
    });
    expect(findMeasurement(cityData, "PM 2.5")).toEqual({
      name: "PM 2.5",
      value: "20"
    });
  });
});
