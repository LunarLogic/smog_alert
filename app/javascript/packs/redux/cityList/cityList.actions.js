import cityListActionTypes from "./cityList.types";

export const getCityList = cityList => ({
  type: cityListActionTypes.GET_CITY_LIST,
  payload: cityList
});
