import { createSelector } from "reselect";

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
