import React from "react";
import { data } from "./chartContent";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryContainer
} from "victory";
import { setColor } from "../../helpers/setColor";

const Chart = () => {
  const average_data = data.data.average_pollution_by_hour.average_pm10;
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

export default Chart;
