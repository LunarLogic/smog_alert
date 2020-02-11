import { setCurrentPath } from "../../../redux/application/application.actions";
import applicationActionTypes from "../../../redux/application/application.types";

describe("application actions", () => {
  it("should create an action to set current path", () => {
    const path = "/aktualnosci";
    const expectedAction = {
      type: applicationActionTypes.SET_CURRENT_PATH,
      payload: path
    };
    expect(setCurrentPath(path)).toEqual(expectedAction);
  });
});
