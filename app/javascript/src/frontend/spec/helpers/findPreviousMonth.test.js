import { findPreviousMonth } from "../../helpers/findPreviousMonth";

describe("findPreviousMonth", () => {
  it("returns the same date when given a date with day number after half of the month", () => {
    let date = new Date("20 Feb 2020");
    let updatedDate = findPreviousMonth(date);
    expect(updatedDate.getDate()).toEqual(20);
    expect(updatedDate.getMonth()).toEqual(1);
    expect(updatedDate.getYear()).toEqual(2020 - 1900);
  });
  it("returns previous month date when given a date with day number before half of the month", () => {
    let date = new Date("14 Feb 2020");
    let updatedDate = findPreviousMonth(date);
    expect(updatedDate.getDate()).toEqual(14);
    expect(updatedDate.getMonth()).toEqual(0);
    expect(updatedDate.getYear()).toEqual(2020 - 1900);
  });
  it("returns previous month date with previous year when given a date with day number before half of the month and being January", () => {
    let date = new Date("14 Jan 2020");
    let updatedDate = findPreviousMonth(date);
    expect(updatedDate.getDate()).toEqual(14);
    expect(updatedDate.getMonth()).toEqual(11);
    expect(updatedDate.getYear()).toEqual(2019 - 1900);
  });
});
