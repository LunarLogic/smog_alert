import axios from "axios";
import mapActionTypes from "./map.types";

export const getCitiesPollutionData = () => {
  return dispatch => {
    return axios.get("/api/internal/measurements/current").then(({ data }) => {
      console.log(data.data);
      dispatch({
        type: mapActionTypes.GET_CITIES_POLLUTION_DATA,
        payload: data.data
      });
    });
  };
};
