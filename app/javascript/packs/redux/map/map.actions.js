import mapActionTypes from "./map.types";

export const getCitiesPollutionData = citiesPollutionData => ({
  type: mapActionTypes.GET_CITIES_POLLUTION_DATA,
  payload: citiesPollutionData
});

export const getMapAreaData = mapAreaId => ({
  type: mapActionTypes.GET_MAP_AREA_DATA,
  payload: mapAreaId
});
