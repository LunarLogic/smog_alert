import React from "react";
import "./CardPollution.scss";

const CardPollution = () => {
  return (
    <div className="card-pollution__current-data-container">
      <div className="card-pollution__current-data-overview">
        <div className="card-pollution__current-data-overview-face"></div>
        <div className="card-pollution__current-data-overview-text">
          Niezdrowa
        </div>
      </div>
      <div className="card-pollution__current-data-specific">
        <div className="card-pollution__current-data-specific-wrapper">
          <div className="card-pollution__current-data-specific-primary">
            <div className="card-pollution__current-data-specific-primary-index">
              PM 10
            </div>
            <div className="card-pollution__current-data-specific-primary-value">
              <span className="card-pollution__current-data-specific-primary-value--bold">
                56
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
                22
              </span>
              μg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPollution;
