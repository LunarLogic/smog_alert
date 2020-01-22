import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./PollutionCard.scss";
import { OverviewText, DataSpecific } from "./PollutionCard.styles.jsx";

import { selectChosenCityData } from "../../redux/redux.selectors";
import { setColor, setEmot, setGradient, findMeasurement } from "../../helpers";

export const PollutionCard = ({ chosenCityData }) => {
  let color, emot, gradient, pm10, pm25;

  if (chosenCityData) {
    var { last_hour_measurement } = chosenCityData;
    color = setColor(last_hour_measurement);
    emot = setEmot(last_hour_measurement);
    gradient = setGradient(last_hour_measurement);
    pm10 = findMeasurement(chosenCityData, "PM 10").value;
    pm25 = findMeasurement(chosenCityData, "PM 2.5").value;
  }

  return chosenCityData ? (
    <div className="card-pollution__current-data-container">
      <div className="card-pollution__current-data-overview">
        <div className="card-pollution__current-data-overview-face">{emot}</div>
        <OverviewText color={color}>
          {last_hour_measurement
            ? last_hour_measurement.status
            : "brak pomiaru"}
        </OverviewText>
      </div>
      <DataSpecific gradient={gradient}>
        <div className="card-pollution__current-data-specific-container">
          <div className="card-pollution__current-data-specific-primary">
            <div className="card-pollution__current-data-specific-primary-index">
              PM 10
            </div>
            <div className="card-pollution__current-data-specific-primary-value">
              <span className="card-pollution__current-data-specific-primary-value--bold">
                {typeof pm10 === "number" ? Math.round(pm10) : pm10}
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
                {typeof pm25 === "number" ? Math.round(pm25) : pm25}
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

PollutionCard.propTypes = {
  chosenCityData: PropTypes.object
};

export default connect(mapStateToProps)(PollutionCard);
