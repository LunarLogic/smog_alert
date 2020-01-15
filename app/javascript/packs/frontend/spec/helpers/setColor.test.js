import { setColor } from "../../helpers";
import { goodFirst, noDataColor } from "../../styles/_variables.scss";

describe("setColor", () => {
  it("returns correct data", () => {
    const mockLastHourMeasurement = {
      status: "bardzo dobry"
    };
    expect(setColor(mockLastHourMeasurement)).toEqual(goodFirst);
    expect(setColor()).toEqual(noDataColor);
    expect(setColor(null)).toEqual(noDataColor);
    expect(setColor(undefined)).toEqual(noDataColor);
  });
});
