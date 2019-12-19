import axios from "axios";
import mapActionTypes from "./map.types";

export const getCitiesPollutionData = citiesPollutionData => ({
  type: mapActionTypes.GET_CITIES_POLLUTION_DATA,
  payload: citiesPollutionData
});
