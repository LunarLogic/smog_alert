import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { PollutionBar } from "../";
import { setColor, findMeasurement } from "../../helpers";
import { selectCitiesPollutionData } from "../../redux/redux.selectors";
import {
  getChosenCity,
  getHoveredCity
} from "../../redux/mapSection/mapSection.actions";

import "./PollutionComparison.scss";

export const PollutionComparison = ({
  citiesPollutionData,
  getChosenCity,
  getHoveredCity
}) => {
  let highestPollutionValue;
  let sortedPollutionData;

  const handleChosenCity = city => {
    getChosenCity(city);
    getHoveredCity("");
  };

  const handleHover = city => {
    getHoveredCity(city);
  };

  const removeHover = () => {
    getHoveredCity("");
  };

  if (citiesPollutionData.length) {
    const pollutionDataNoMeasurement = citiesPollutionData.filter(
      city => !city.last_hour_measurement
    );
    sortedPollutionData = citiesPollutionData
      .filter(city => city.last_hour_measurement)
      .sort(
        (a, b) =>
          findMeasurement(b, "PM 10").value - findMeasurement(a, "PM 10").value
      );
    highestPollutionValue = findMeasurement(sortedPollutionData[0], "PM 10")
      .value;
    sortedPollutionData = sortedPollutionData.concat(
      pollutionDataNoMeasurement
    );
  }

  return (
    <div className="pollution-comparison">
      {citiesPollutionData.length
        ? sortedPollutionData.map(cityData => {
            const {
              location_name,
              location_display_name,
              last_hour_measurement
            } = cityData;
            const width =
              (findMeasurement(cityData, "PM 10").value * 100) /
              highestPollutionValue;
            return (
              <PollutionBar
                key={`${location_display_name}-bar`}
                width={width}
                backgroundColor={setColor(last_hour_measurement)}
                location={location_display_name}
                value={findMeasurement(cityData, "PM 10").value}
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
