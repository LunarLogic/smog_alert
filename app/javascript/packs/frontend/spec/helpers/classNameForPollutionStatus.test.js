import { classNameForPollutionStatus } from "../../helpers";

describe("classNameForPollutionStatus", () => {
  it("returns correct className", () => {
    expect(classNameForPollutionStatus("bardzo dobry")).toEqual("very-good");
    expect(classNameForPollutionStatus(undefined)).toEqual(
      "no-sufficient-data"
    );
    expect(classNameForPollutionStatus("zbyt mało danych")).toEqual(
      "no-sufficient-data"
    );
  });
});
