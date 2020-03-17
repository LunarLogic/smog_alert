import { setIndicator } from "../../helpers";

describe("setIndicator", () => {
  it("returns correct data", () => {
    const mockLastHourMeasurement = {
      status: "bardzo zły"
    };
    expect(setIndicator(mockLastHourMeasurement)).toEqual(6);
    expect(setIndicator(null)).toEqual(null);
  });
});
