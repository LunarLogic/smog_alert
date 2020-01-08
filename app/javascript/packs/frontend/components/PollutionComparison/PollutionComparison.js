import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { PollutionBar } from "../";
import { setColor } from "../../helpers";
import { selectCitiesPollutionData } from "../../redux/redux.selectors";
import {
  getChosenCity,
  getHoveredCity
} from "../../redux/mapSection/mapSection.actions";

import "./PollutionComparison.scss";

const PollutionComparison = ({
  citiesPollutionData,
  getChosenCity,
  getHoveredCity
}) => {
  let highestPollutionValue;
  let sortedPollutionData;

  const handleChosenCity = city => {
    getChosenCity(city);
  };

  const handleHover = city => {
    getHoveredCity(city);
  };

  const removeHover = () => {
    getHoveredCity("");
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
                key={`${location_name}-bar`}
                width={width}
                backgroundColor={setColor(last_hour_measurement.status)}
                location={location_name}
                value={last_hour_measurement.values.pm10}
                onClick={() => {
                  handleChosenCity(location_name);
                }}
                onMouseOver={() => handleHover(location_name)}
                onMouseOut={removeHover}
              />
            );
          })
        : "loading"}
    </div>
  );
};

PollutionComparison.propTypes = {
  citiesPollutionData: PropTypes.array,
  getChosenCity: PropTypes.func,
  getHoveredCity: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity)),
  getHoveredCity: hoveredCity => dispatch(getHoveredCity(hoveredCity))
});

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollutionComparison);