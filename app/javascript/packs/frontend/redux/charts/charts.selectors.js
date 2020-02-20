import { createSelector } from "reselect";

const selectChart = state => state.chart;

export const selectChartChosenCity = createSelector(
  [selectChart],
  chart => chart.chartChosenCity
);
