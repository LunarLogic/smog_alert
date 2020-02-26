import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";

import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryContainer
} from "victory";
import { setColor } from "../../helpers/setColor";

import { selectChartHourlyAverageForMonthDataPollutionValues } from "../../redux/charts/charts.selectors";

const Chart = ({
  indicator,
  chartHourlyAverageForMonthDataPollutionValues
}) => {
  let chartData = chartHourlyAverageForMonthDataPollutionValues;

  let chartIndicator;
  indicator === "PM 10"
    ? (chartIndicator = "average_pm10")
    : (chartIndicator = "average_pm25");

  // Assign value to average_data required by Victory Chart - until data is available assign mock default data
  let average_data = Array.from(Array(24), (x, index) => {
    const hourlyDefaultValues = { hour: index, value: 0, status: "" };
    return hourlyDefaultValues;
  });
  if (chartData) {
    average_data = chartData[chartIndicator];
  }

  const maxValue = Math.max(...average_data.map(item => item.value));

  return (
    <div className="chart-average-pollution-by-hour">
      <VictoryChart
        singleQuadrantDomainPadding={{ x: false }}
        domainPadding={20}
        domain={{ x: [0, 24], y: [0, maxValue + 10] }}
        width={1150}
        height={500}
        containerComponent={
          <VictoryContainer style={{ position: "unset", width: "inherit" }} />
        }
      >
        <VictoryAxis
          tickValues={Array.from(Array(24), (x, index) => index)}
          tickFormat={x => `${x}h`}
          style={{
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 16, padding: 5 }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            ticks: { stroke: "grey", size: 5 },
            tickLabels: { fontSize: 16, padding: 5 }
          }}
          tickFormat={y => `${y}ug`}
        />
        <VictoryBar
          barRatio={0.5}
          data={average_data}
          x="hour"
          y="value"
          style={{
            data: {
              fill: ({ datum }) => setColor(datum)
            },
            labels: {
              fontSize: 15
            }
          }}
        />
      </VictoryChart>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  chartHourlyAverageForMonthDataPollutionValues: selectChartHourlyAverageForMonthDataPollutionValues
});

Chart.propTypes = {
  indicator: PropTypes.string,
  chartHourlyAverageForMonthDataPollutionValues: PropTypes.object
};

export default connect(mapStateToProps)(Chart);
