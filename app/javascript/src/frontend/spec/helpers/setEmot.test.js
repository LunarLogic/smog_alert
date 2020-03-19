import { setEmot } from "../../helpers/setEmot";

describe("setEmot", () => {
  it("returns correct emot component", () => {
    const mockLastHourMeasurement = {
      status: "zły"
    };
    expect(typeof setEmot(mockLastHourMeasurement)).toEqual("object");
    expect(typeof setEmot(null)).toEqual("object");
  });
});
