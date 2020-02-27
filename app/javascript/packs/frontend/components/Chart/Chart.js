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

const Chart = ({ indicator, chartHourlyPollutionValues }) => {
  let chartIndicator;
  indicator === "PM 10"
    ? (chartIndicator = "average_pm10")
    : (chartIndicator = "average_pm25");

  // Assign value to average_data required by Victory Chart - until data is available assign mock default data
  let average_data = Array.from(Array(24), (x, index) => {
    return { hour: index, value: 0, status: "" };
  });
  if (chartHourlyPollutionValues) {
    average_data = chartHourlyPollutionValues[chartIndicator];
    // There's a need to add 1 to each hour as it cannot start with 0 as per Victory library requirements to be displayed correctly
    for (let data of average_data) {
      data.hour += 1;
    }
  }

  const maxValue = Math.max(...average_data.map(item => item.value));

  return (
    <div className="chart-average-pollution-by-hour">
      <VictoryChart
        singleQuadrantDomainPadding={{ x: false }}
        domainPadding={20}
        domain={{ x: [1, 25], y: [0, maxValue + 10] }}
        width={1150}
        height={500}
        containerComponent={
          <VictoryContainer style={{ position: "unset", width: "inherit" }} />
        }
      >
        <VictoryAxis
          tickValues={Array.from(Array(24), (x, index) => index + 1)}
          tickFormat={x => `${x - 1}h`}
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
  chartHourlyPollutionValues: selectChartHourlyAverageForMonthDataPollutionValues
});

Chart.propTypes = {
  indicator: PropTypes.string,
  chartHourlyPollutionValues: PropTypes.object
};

export default connect(mapStateToProps)(Chart);
