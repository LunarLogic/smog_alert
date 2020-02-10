import { createSelector } from "reselect";

const selectSearchbox = state => state.searchbox;

export const selectLocation = createSelector(
  [selectSearchbox],
  searchbox => searchbox.location_display_name
);

const selectHomepage = state => state.homepage;

export const selectPopUpStatus = createSelector(
  [selectHomepage],
  homepage => homepage.popUpOpen
);

export const selectCitiesPollutionData = createSelector(
  [selectHomepage],
  homepage => homepage.citiesPollutionData
);

export const selectCitiesPollutionDataList = createSelector(
  [selectCitiesPollutionData],
  citiesPollutionData =>
    citiesPollutionData.map(item => item.location_display_name)
);

export const selectChosenCityData = createSelector(
  [selectCitiesPollutionData, selectLocation],
  (citiesPollutionData, location_display_name) => {
    if (citiesPollutionData.length && location_display_name) {
      return citiesPollutionData.find(
        item => item.location_display_name === location_display_name
      );
    }
  }
);

export const selectAdvice = createSelector(
  [selectChosenCityData],
  chosenCityData => {
    if (chosenCityData && chosenCityData.last_hour_measurement) {
      return chosenCityData.last_hour_measurement.advice;
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

const selectCalendar = state => state.calendar;

export const selectCalendarChosenYear = createSelector(
  [selectCalendar],
  calendar => calendar.calendarChosenYear
);

export const selectCalendarStatusData = createSelector(
  [selectCalendar],
  calendar => calendar.calendarStatusData
);

export const selectCalendarValuesData = createSelector(
  [selectCalendar],
  calendar => calendar.calendarValuesData
);

const selectNews = state => state.news;

export const selectArticles = createSelector(
  [selectNews],
  news => news.articles
);

const selectApplication = state => state.application;

export const selectPath = createSelector(
  [selectApplication],
  application => application.path
);
