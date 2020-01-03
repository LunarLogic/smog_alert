import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./PollutionCard.scss";
import { noDataColor } from "../../styles/_variables";
import { OverviewText, DataSpecific } from "./PollutionCard.styles.jsx";

import { selectChosenCityData } from "../../redux/redux.selectors";
import { setColor } from "../../helpers/setColor";

const PollutionCard = ({ chosenCityData }) => {
  const noData = "--";
  let color;

  if (chosenCityData) {
    var { last_hour_measurement } = chosenCityData;
    if (last_hour_measurement) {
      color = setColor(last_hour_measurement.status);
    } else {
      color = noDataColor;
    }
  }

  return chosenCityData ? (
    <div className="card-pollution__current-data-container">
      <div className="card-pollution__current-data-overview">
        <div
          className="card-pollution__current-data-overview-face"
          style={{
            backgroundColor: color
          }}
        ></div>
        <OverviewText color={color}>
          {last_hour_measurement
            ? last_hour_measurement.status
            : "brak pomiaru"}
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
                {last_hour_measurement
                  ? Math.round(chosenCityData.last_hour_measurement.values.pm10)
                  : noData}
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
                {last_hour_measurement
                  ? Math.round(chosenCityData.last_hour_measurement.values.pm25)
                  : noData}
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
