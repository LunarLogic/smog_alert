import { setGradient } from "../../helpers/setGradient";
import {
  unhealthyFirst,
  unhealthySecond,
  noDataColor
} from "../../styles/_variables.scss";

describe("setGradient", () => {
  it("returns correct colors combination", () => {
    const mockLastHourMeasurement1 = {
      status: "umiarkowany"
    };
    const mockLastHourMeasurement2 = {
      status: "dostateczny"
    };
    expect(setGradient(mockLastHourMeasurement1).color1).toEqual(
      unhealthySecond
    );
    expect(setGradient(mockLastHourMeasurement2).color1).toEqual(
      unhealthyFirst
    );
    expect(setGradient(null).color1).toEqual(noDataColor);
    expect(setGradient(null).color2).toEqual(noDataColor);
  });
});
