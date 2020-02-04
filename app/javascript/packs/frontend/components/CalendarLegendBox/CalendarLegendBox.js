import React from "react";
import { PropTypes } from "prop-types";

import "./CalendarLegendBox.scss";

const CalendarLegendBox = ({ customClassName, status, numberOfDays }) => {
  return (
    <div className={`calendar-legend-box ${customClassName}`}>
      <span>
        {`${status}:`}
        <br />
        {`${numberOfDays} dni`}
      </span>
    </div>
  );
};

CalendarLegendBox.propTypes = {
  customClassName: PropTypes.string,
  status: PropTypes.string,
  numberOfDays: PropTypes.number
};

export default CalendarLegendBox;
