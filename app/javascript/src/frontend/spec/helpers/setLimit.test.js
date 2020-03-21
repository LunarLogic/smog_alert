import { setLimit } from "../../helpers/setLimit";

describe("setLimit", () => {
  it("returns correct data from setLimit function", () => {
    const pollutionNames = { PM10: "PM 10", PM25: "PM 2.5", foo: "foo" };
    expect(setLimit(pollutionNames.PM10)).toEqual("50");
    expect(setLimit(pollutionNames.PM25)).toEqual("25");
    expect(setLimit(pollutionNames.foo)).toEqual("--");
    expect(setLimit()).toEqual("--");
    expect(setLimit(null)).toEqual("--");
    expect(setLimit(undefined)).toEqual("--");
  });
});
