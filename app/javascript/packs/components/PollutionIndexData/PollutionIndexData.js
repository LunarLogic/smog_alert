import React from "react";
import "./PollutionIndexData.scss";
import { PropTypes } from "prop-types";

const PollutionIndexData = ({ indicator, value, percent, limit }) => {
  return (
    <div className="pollution-index-data">
      <div className="pollution-index-data__info">
        <div className="pollution-index-data__info-indicator">{indicator}</div>
        <div className="pollution-index-data__info-value">
          <span>{value}</span>μg
        </div>
        <div className="pollution-index-data__info-percent">
          {percent}% normy
        </div>
      </div>
      <div className="pollution-index-data__limit">
        Norma dla {indicator} wynosi {limit} ug/m3
      </div>
    </div>
  );
};

PollutionIndexData.propTypes = {
  indicator: PropTypes.string,
  value: PropTypes.number,
  percent: PropTypes.number,
  limit: PropTypes.number
};

export default PollutionIndexData;
