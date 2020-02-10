import { getDate } from "../../helpers";

describe("getDate", () => {
  it("returns correct value when date string is provided", () => {
    const dateString = "2020-02-07T11:51:23.698Z";
    expect(getDate(dateString)).toEqual("7 lutego 2020r., 12:51");
  });
  it("returns correct data when date string is not provided", () => {
    expect(getDate()).toEqual("--");
    expect(getDate(null)).toEqual("--");
    expect(getDate(undefined)).toEqual("--");
  });
});
