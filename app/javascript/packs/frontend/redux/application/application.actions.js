import applicationActionTypes from "./application.types";

export const setCurrentPath = path => ({
  type: applicationActionTypes.SET_CURRENT_PATH,
  payload: path
});
