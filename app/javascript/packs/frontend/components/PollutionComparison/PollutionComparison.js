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
    getHoveredCity("");
  };

  const handleHover = city => {
    getHoveredCity(city);
  };

  const removeHover = () => {
    getHoveredCity("");
  };

  const getPM10 = cityData => {
    let values = cityData.last_hour_measurement.values;
    return values.find(value => value.name === "PM 10");
  };

  if (citiesPollutionData.length) {
    sortedPollutionData = citiesPollutionData.sort(
      (a, b) => getPM10(b).value - getPM10(a).value
    );
    highestPollutionValue = getPM10(sortedPollutionData[0]).value;
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
              (getPM10(cityData).value * 100) / highestPollutionValue;
            return (
              <PollutionBar
                key={`${location_display_name}-bar`}
                width={width}
                backgroundColor={setColor(last_hour_measurement)}
                location={location_display_name}
                value={getPM10(cityData).value}
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
