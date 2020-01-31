import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import {
  Calendar as CalendarYearly,
  CalendarControls
} from "react-yearly-calendar";

import {
  getCalendarStatusData,
  getCalendarValuesData
} from "../../redux/calendar/calendar.actions";
import {
  selectCalendarStatusData,
  selectCalendarValuesData
} from "../../redux/redux.selectors";

import "./Calendar.scss";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";

const Calendar = ({
  getCalendarStatusData,
  getCalendarValuesData,
  calendarStatusData,
  calendarValuesData
}) => {
  useEffect(() => {
    getCalendarStatusData(2019, 19);
  }, []);

  const data = calendarStatusData["2019"];

  return (
    <div className="calendar">
      <CalendarControls year={2019} />
      <CalendarYearly year={2019} customClasses={data} firstDayOfWeek={1} />
    </div>
  );
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
