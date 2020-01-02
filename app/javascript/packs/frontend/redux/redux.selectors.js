import { createSelector } from "reselect";

export const selectSearchbox = state => state.searchbox;

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
        item => item.location_name === location_name
      );
    }
  }
);
