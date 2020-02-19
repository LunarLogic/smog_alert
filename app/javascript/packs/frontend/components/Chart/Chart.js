import React from "react";
import { data } from "./chartContent";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

const Chart = () => {
  return (
    <div>
      <VictoryChart
        domainPadding={{ x: [200, 0] }}
        domain={{ x: [0, 24], y: [0, 200] }}
      >
        <VictoryAxis tickFormat={x => `${x}h`} />
        <VictoryAxis dependentAxis tickFormat={y => `${y}ug`} />
        <VictoryBar data={data} x="hour" y="pollution" />
      </VictoryChart>
    </div>
  );
};

export default Chart;
