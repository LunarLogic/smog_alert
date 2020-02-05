import React from "react";
import { PropTypes } from "prop-types";

import { CalendarLegendBoxDiv } from "./CalendarLegendBox.styles.jsx";

const CalendarLegendBox = ({ backgroundColor, status, numberOfDays }) => {
  return (
    <CalendarLegendBoxDiv backgroundColor={backgroundColor}>
      <span>
        {`${status}:`}
        <br />
        {`${numberOfDays} dni`}
      </span>
    </CalendarLegendBoxDiv>
  );
};

CalendarLegendBox.propTypes = {
  backgroundColor: PropTypes.string,
  status: PropTypes.string,
  numberOfDays: PropTypes.number
};

export default CalendarLegendBox;
