import React from "react";
import { PropTypes } from "prop-types";

import "./CardPollution.scss";
import { OverviewText, DataSpecific } from "./CardPollution.styles.jsx";

const CardPollution = ({ pm10, pm25, color, text }) => {
  return (
    <div className="card-pollution__current-data-container">
      <div className="card-pollution__current-data-overview">
        <div
          className="card-pollution__current-data-overview-face"
          style={{ backgroundColor: color }}
        ></div>
        <OverviewText color={color}>{text}</OverviewText>
      </div>
      <DataSpecific color={color}>
        <div className="card-pollution__current-data-specific-container">
          <div className="card-pollution__current-data-specific-primary">
            <div className="card-pollution__current-data-specific-primary-index">
              PM 10
            </div>
            <div className="card-pollution__current-data-specific-primary-value">
              <span className="card-pollution__current-data-specific-primary-value--bold">
                {pm10}
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
                {pm25}
              </span>
              μg
            </div>
          </div>
        </div>
      </DataSpecific>
    </div>
  );
};

CardPollution.propTypes = {
  pm10: PropTypes.number,
  pm25: PropTypes.number,
  color: PropTypes.string,
  text: PropTypes.string
};

export default CardPollution;
