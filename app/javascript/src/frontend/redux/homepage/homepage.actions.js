import axios from "axios";
import homepageActionTypes from "./homepage.types";

export const getCitiesPollutionData = () => {
  return dispatch => {
    return axios.get("/api/internal/measurements/current").then(({ data }) => {
      dispatch({
        type: homepageActionTypes.GET_CITIES_POLLUTION_DATA,
        payload: data.data
      });
    });
  };
};

export const setPopUpStatus = popUpOpen => ({
  type: homepageActionTypes.SET_POPUP_STATUS,
  payload: popUpOpen
});
