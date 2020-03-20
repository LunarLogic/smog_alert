import { changePickedDateIntoText } from "../../helpers/changePickedDateIntoText";

describe("changePickedDateIntoText", () => {
  it("return correct date formatted value", () => {
    expect(changePickedDateIntoText(new Date(2020, 1, 2))).toEqual("luty 2020");
  });
});
