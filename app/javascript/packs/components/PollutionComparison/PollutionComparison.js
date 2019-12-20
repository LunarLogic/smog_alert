import React from "react";
import { PropTypes } from "prop-types";

import { PollutionBar } from "../";
import { setColor } from "../../helpers";

import "./PollutionComparison.scss";

const PollutionComparison = ({ citiesPollutionData }) => {
  let highestPollutionValue;
  let sortedPollutionData;

  if (citiesPollutionData.length !== 0) {
    sortedPollutionData = citiesPollutionData.sort(
      (a, b) =>
        b.last_hour_measurement.values.pm10 -
        a.last_hour_measurement.values.pm10
    );
    highestPollutionValue =
      sortedPollutionData[0].last_hour_measurement.values.pm10;
  }

  return (
    <div className="pollution-comparison">
      {citiesPollutionData.length !== 0
        ? sortedPollutionData.map(cityData => {
            const { location_name, last_hour_measurement } = cityData;
            const width =
              (last_hour_measurement.values.pm10 * 100) / highestPollutionValue;
            return (
              <PollutionBar
                key={location_name}
                width={width}
                backgroundColor={setColor(last_hour_measurement.status)}
                location={location_name}
                value={last_hour_measurement.values.pm10}
              />
            );
          })
        : "loading"}
    </div>
  );
};

PollutionComparison.propTypes = {
  citiesPollutionData: PropTypes.array
};

export default PollutionComparison;
