import axios from "axios";
import mapActionTypes from "./homepage.types";

export const getCitiesPollutionData = () => {
  return dispatch => {
    return axios.get("/api/internal/measurements/current").then(({ data }) => {
      dispatch({
        type: mapActionTypes.GET_CITIES_POLLUTION_DATA,
        payload: data.data
      });
    });
  };
};
