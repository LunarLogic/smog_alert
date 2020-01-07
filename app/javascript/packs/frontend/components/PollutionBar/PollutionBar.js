import React from "react";
import { PropTypes } from "prop-types";

import "./PollutionBar.scss";

const PollutionBar = ({ width, backgroundColor, location, value }) => {
  return (
    <div className="pollution-bar">
      <div className="pollution-bar__info">
        <div className="pollution-bar__info-location">{location}</div>
        <div className="pollution-bar__info-type">PM10</div>
        <div className="pollution-bar__info-value">{value} μg/m³</div>
      </div>
      <div
        className="pollution-bar__bar"
        style={{ width: `${width}%`, backgroundColor: `${backgroundColor}` }}
      ></div>
    </div>
  );
};

PollutionBar.propTypes = {
  width: PropTypes.number,
  backgroundColor: PropTypes.string,
  location: PropTypes.string,
  value: PropTypes.number
};

export default PollutionBar;
