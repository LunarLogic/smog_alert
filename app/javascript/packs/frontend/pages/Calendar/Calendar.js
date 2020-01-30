import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import {
  getCalendarStatusData,
  getCalendarValuesData
} from "../../redux/calendar/calendar.actions";
import {
  selectCalendarStatusData,
  selectCalendarValuesData
} from "../../redux/redux.selectors";

const Calendar = ({
  getCalendarStatusData,
  getCalendarValuesData,
  calendarStatusData,
  calendarValuesData
}) => {
  return <div className="calendar">KALENDARZ</div>;
};

const mapStateToProps = createStructuredSelector({
  calendarStatusData: selectCalendarStatusData,
  calendarValuesData: selectCalendarValuesData
});

Calendar.propTypes = {
  getCalendarStatusData: PropTypes.func,
  getCalendarValuesData: PropTypes.func,
  calendarStatusData: PropTypes.object,
  calendarValuesData: PropTypes.object
};

export default connect(mapStateToProps, {
  getCalendarStatusData,
  getCalendarValuesData
})(Calendar);
