import React from "react";
import "./CardPollution.scss";
import { connect } from "react-redux";

const CardPollution = ({ location, pm10, pm25, color, text }) => {
  return (
    <div className="card-pollution__current-data-container">
      <div className="card-pollution__current-data-overview">
        <div
          className="card-pollution__current-data-overview-face"
          style={{ backgroundColor: color }}
        ></div>
        <div className="card-pollution__current-data-overview-text">
          Niezdrowa
        </div>
      </div>
      <div className="card-pollution__current-data-specific">
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
      </div>
    </div>
  );
};

const mapStateToProps = ({
  searchbox: { location, pm10, pm25, color, text }
}) => ({
  location,
  pm10,
  pm25,
  color,
  text
});

export default connect(mapStateToProps)(CardPollution);
