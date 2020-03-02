import { createSelector } from "reselect";
import { selectCitiesPollutionData } from "../redux.selectors";

const selectChart = state => state.chart;

export const selectChartChosenCity = createSelector(
  [selectChart],
  chart => chart.chartChosenCity
);

export const selectChartChosenIndicator = createSelector(
  [selectChart],
  chart => chart.chartChosenIndicator
);

export const selectChartChosenMonth = createSelector(
  [selectChart],
  chart => chart.chartChosenMonth
);

export const selectChartHourlyAverageForMonthData = createSelector(
  [selectChart],
  chart => chart.chartHourlyAverageForMonthData
);

export const selectChartAverageHourPollution = createSelector(
  [selectChartHourlyAverageForMonthData],
  data => data.average_pollution_by_hour
);

export const selectChartChosenCityIndex = createSelector(
  [selectCitiesPollutionData, selectChartChosenCity],
  (citiesPollutionData, location_display_name) => {
    if (citiesPollutionData.length && location_display_name) {
      return citiesPollutionData.find(
        item => item.location_display_name === location_display_name
      ).location_id;
    }
  }
);
