import React from "react";
import "./PollutionComparison.scss";
import pollutionComparisonContent from "./pollutionComparisonContent";
import PollutionBar from "../PollutionBar/PollutionBar";

const PollutionComparison = () => {
  const sortedPollutionData = pollutionComparisonContent.sort(
    (a, b) => b.value - a.value
  );

  const highestPollutionValue = sortedPollutionData[0].value;

  const mapPollutionData = city => {
    const { location, value, color } = city;
    const width = (value * 100) / highestPollutionValue;
    return (
      <PollutionBar
        key={location}
        width={width}
        backgroundColor={color}
        location={location}
        value={value}
      />
    );
  };

  return (
    <div className="pollution-comparison">
      {sortedPollutionData.map(mapPollutionData)}
    </div>
  );
};

export default PollutionComparison;
