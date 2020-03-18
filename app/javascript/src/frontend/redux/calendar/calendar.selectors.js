import { createSelector } from "reselect";
import { selectCitiesPollutionData } from "../redux.selectors";

const selectCalendar = state => state.calendar;

export const selectCalendarChosenYear = createSelector(
  [selectCalendar],
  calendar => calendar.calendarChosenYear
);

export const selectCalendarStatusData = createSelector(
  [selectCalendar],
  calendar => calendar.calendarStatusData
);

export const selectCalendarChosenDay = createSelector(
  [selectCalendar],
  calendar => calendar.calendarChosenDay
);

export const selectCalendarChosenCity = createSelector(
  [selectCalendar],
  calendar => calendar.calendarChosenCity
);

export const selectCalendarValuesData = createSelector(
  [selectCalendar],
  calendar => calendar.calendarValuesData
);

export const selectCalendarDailyValuesData = createSelector(
  [selectCalendar],
  calendar => calendar.calendarDailyValuesData
);

export const selectCalendarChosenCityIndex = createSelector(
  [selectCitiesPollutionData, selectCalendarChosenCity],
  (citiesPollutionData, location_display_name) => {
    if (citiesPollutionData.length && location_display_name) {
      return citiesPollutionData.find(
        item => item.location_display_name === location_display_name
      ).location_id;
    }
  }
);
