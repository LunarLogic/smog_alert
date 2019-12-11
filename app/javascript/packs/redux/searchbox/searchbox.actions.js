import searchboxActionTypes from "./searchbox.types";

export const getCityPollutionData = cityPollutionData => ({
  type: searchboxActionTypes.GET_CITY_POLLUTION_DATA,
  payload: cityPollutionData
});
