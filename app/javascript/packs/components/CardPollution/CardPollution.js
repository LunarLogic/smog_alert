import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./CardPollution.scss";
import { OverviewText, DataSpecific } from "./CardPollution.styles.jsx";

import { selectChosenCityData } from "../../redux/redux.selectors";
import { setColor } from "../../helpers/setColor";

const CardPollution = ({ chosenCityData }) => {
  let color;
  let shouldRender = chosenCityData;

  if (shouldRender) {
    color = setColor(chosenCityData.last_hour_measurement.status);
  }

  return shouldRender ? (
    <div className="card-pollution__current-data-container">
      <div className="card-pollution__current-data-overview">
        <div
          className="card-pollution__current-data-overview-face"
          style={{
            backgroundColor: color
          }}
        ></div>
        <OverviewText color={color}>
          {chosenCityData.last_hour_measurement.status}
        </OverviewText>
      </div>
      <DataSpecific color={color}>
        <div className="card-pollution__current-data-specific-container">
          <div className="card-pollution__current-data-specific-primary">
            <div className="card-pollution__current-data-specific-primary-index">
              PM 10
            </div>
            <div className="card-pollution__current-data-specific-primary-value">
              <span className="card-pollution__current-data-specific-primary-value--bold">
                {Math.round(chosenCityData.last_hour_measurement.values.pm10)}
              </span>
              μg
            </div>
          </div>
          <div className="card-pollution__current-data-specific-secondary">
            <div className="card-pollution__current-data-specific-secondary-index">
              PM 2.5
            </div>
            <div className="card-pollution__current-data-specific-secondary-value">
              <span className="card-pollution__current-data-specific-secondary-value--bold">
                {Math.round(chosenCityData.last_hour_measurement.values.pm25)}
              </span>
              μg
            </div>
          </div>
        </div>
      </DataSpecific>
    </div>
  ) : (
    <div className="card-pollution__current-data-container"></div>
  );
};

const mapStateToProps = createStructuredSelector({
  chosenCityData: selectChosenCityData
});

CardPollution.propTypes = {
  chosenCityData: PropTypes.object
};

export default connect(mapStateToProps)(CardPollution);
