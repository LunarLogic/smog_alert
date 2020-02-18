import axios from "axios";
import applicationActionTypes from "./application.types";

export const setCurrentPath = path => ({
  type: applicationActionTypes.SET_CURRENT_PATH,
  payload: path
});

export const getOrganizationDetails = () => {
  return dispatch => {
    return axios
      .get("/api/internal/organizations/current_data")
      .then(({ data }) => {
        dispatch({
          type: applicationActionTypes.GET_ORGANIZATION_DETAILS,
          payload: data.data
        });
      });
  };
};
