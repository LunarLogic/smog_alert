import { classNameForPollutionStatus } from "../../helpers";

describe("classNameForPollutionStatus", () => {
  it("returns correct className", () => {
    expect(classNameForPollutionStatus("doskonały")).toEqual("excellent");
    expect(classNameForPollutionStatus(undefined)).toEqual(
      "no-sufficient-data"
    );
    expect(classNameForPollutionStatus("zbyt mało danych")).toEqual(
      "no-sufficient-data"
    );
  });
});
