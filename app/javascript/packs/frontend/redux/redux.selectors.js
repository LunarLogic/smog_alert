import { createSelector } from "reselect";

const selectSearchbox = state => state.searchbox;

export const selectLocation = createSelector(
  [selectSearchbox],
  searchbox => searchbox.location_name
);

const selectHomepage = state => state.homepage;

export const selectCitiesPollutionData = createSelector(
  [selectHomepage],
  homepage => homepage.citiesPollutionData
);

export const selectChosenCityData = createSelector(
  [selectCitiesPollutionData, selectLocation],
  (citiesPollutionData, location_name) => {
    if (citiesPollutionData.length && location_name) {
      return citiesPollutionData.find(
        item => item.location_display_name === location_name
      );
    }
  }
);

const selectMapSection = state => state.mapSection;

export const selectMapLocation = createSelector(
  [selectMapSection],
  mapSection => mapSection.location_name
);

export const selectMapChosenCityData = createSelector(
  [selectCitiesPollutionData, selectMapLocation],
  (citiesPollutionData, location_name) => {
    if (citiesPollutionData.length && location_name) {
      return citiesPollutionData.filter(
        item => item.location_name === location_name
      );
    }
  }
);

export const selectMapHoveredCity = createSelector(
  [selectMapSection],
  mapSection => mapSection.hovered_city
);
