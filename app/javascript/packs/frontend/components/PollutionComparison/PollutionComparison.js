import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { PollutionBar } from "../";
import { setColor } from "../../helpers";
import { selectCitiesPollutionData } from "../../redux/redux.selectors";
import { getChosenCity } from "../../redux/mapSection/mapSection.actions";

import "./PollutionComparison.scss";

const PollutionComparison = ({ citiesPollutionData, getChosenCity }) => {
  let highestPollutionValue;
  let sortedPollutionData;

  const handleChosenCity = city => {
    getChosenCity(city);
  };

  if (citiesPollutionData.length) {
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
      {citiesPollutionData.length
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
                onClick={() => {
                  handleChosenCity(location_name);
                }}
              />
            );
          })
        : "loading"}
    </div>
  );
};

PollutionComparison.propTypes = {
  citiesPollutionData: PropTypes.array,
  getChosenCity: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity))
});

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollutionComparison);
