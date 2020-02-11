import applicationActionTypes from "../../../redux/application/application.types";
import applicationReducer from "../../../redux/application/application.reducer";

describe("application reducer", () => {
  const initialState = {
    path: ""
  };
  it("should return initial state", () => {
    expect(applicationReducer(initialState, {})).toEqual(initialState);
  });
  it("should handle SET_CURRENT_PATH", () => {
    const action = {
      type: applicationActionTypes.SET_CURRENT_PATH,
      payload: "/aktualnosci"
    };
    expect(applicationReducer(initialState, action)).toEqual({
      path: "/aktualnosci"
    });
  });
});
