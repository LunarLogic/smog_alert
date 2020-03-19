import { setPercent } from "../../helpers";

describe("setPercent", () => {
  it("returns correct data", () => {
    const mockPollutionData = {
      PM10: { name: "PM 10", value: 150 },
      PM25: { name: "PM 2.5", value: 100 },
      noData: { name: "PM 2.5", value: null },
      foo: { name: "foo", value: "bar" }
    };
    expect(
      setPercent(mockPollutionData.PM10.name, mockPollutionData.PM10.value)
    ).toEqual(300);
    expect(
      setPercent(mockPollutionData.PM25.name, mockPollutionData.PM25.value)
    ).toEqual(400);
    expect(
      setPercent(mockPollutionData.noData.name, mockPollutionData.noData.value)
    ).toEqual('--');
    expect(
      setPercent(mockPollutionData.foo.name, mockPollutionData.foo.value)
    ).toEqual("--");
    expect(setPercent()).toEqual("--");
    expect(setPercent(null)).toEqual("--");
    expect(setPercent(undefined)).toEqual("--");
  });
});
