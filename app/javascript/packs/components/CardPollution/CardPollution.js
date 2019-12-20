import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import "./CardPollution.scss";
import { OverviewText, DataSpecific } from "./CardPollution.styles.jsx";
import { setColor } from "../../helpers/setColor";

const CardPollution = ({ location_name, citiesPollutionData }) => {
  const data = () => {
    const chosenCityData = citiesPollutionData.find(
      item => item.location_name === location_name
    );
    let color = setColor(chosenCityData.last_hour_measurement.status);
    return { chosenCityData, color };
  };

  let shouldRender = citiesPollutionData.length !== 0;

  return shouldRender ? (
    <div className="card-pollution__current-data-container">
      <div className="card-pollution__current-data-overview">
        <div
          className="card-pollution__current-data-overview-face"
          style={{
            backgroundColor: data().color
          }}
        ></div>
        <OverviewText color={data().color}>
          {data().chosenCityData.last_hour_measurement.status}
        </OverviewText>
      </div>
      <DataSpecific color={data().color}>
        <div className="card-pollution__current-data-specific-container">
          <div className="card-pollution__current-data-specific-primary">
            <div className="card-pollution__current-data-specific-primary-index">
              PM 10
            </div>
            <div className="card-pollution__current-data-specific-primary-value">
              <span className="card-pollution__current-data-specific-primary-value--bold">
                {data().chosenCityData.last_hour_measurement.values.pm10}
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
                {data().chosenCityData.last_hour_measurement.values.pm25}
              </span>
              μg
            </div>
          </div>
        </div>
      </DataSpecific>
    </div>
  ) : (
    <div></div>
  );
};

const mapStateToProps = ({
  homepage: { citiesPollutionData },
  searchbox: { location_name }
}) => ({
  citiesPollutionData,
  location_name
});

CardPollution.propTypes = {
  citiesPollutionData: PropTypes.array,
  location_name: PropTypes.string
};

export default connect(mapStateToProps)(CardPollution);
