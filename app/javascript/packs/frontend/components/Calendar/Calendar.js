import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import {
  Calendar as CalendarYearly,
  CalendarControls
} from "react-yearly-calendar";

import {
  selectCalendarStatusData,
  selectCalendarChosenYear
} from "../../redux/calendar/calendar.selectors";
import {
  setCalendarChosenYear,
  setCalendarChosenDay
} from "../../redux/calendar/calendar.actions";

import { classNameForPollutionStatus } from "../../helpers";

import "./Calendar.scss";

import moment from "moment";

export const Calendar = ({
  setCalendarChosenYear,
  setCalendarChosenDay,
  calendarStatusData,
  calendarChosenYear
}) => {
  const [calendarSelectedDay, setCalendarSelectedDay] = useState(
    moment(new Date())
  );

  // Get status data and convert it to the object used by Calendar to set custom css classes

  const statusData = calendarStatusData[calendarChosenYear];
  let customClassesData = {};

  if (statusData) {
    statusData.forEach(
      item =>
        (customClassesData[classNameForPollutionStatus(item.status)] =
          item.days)
    );
  }

  const onDatePicked = date => {
    setCalendarSelectedDay(date);
    setCalendarChosenDay(date.format("YYYY-MM-DD"));
  };

  return (
    <div className="calendar">
      <CalendarControls
        year={calendarChosenYear}
        onPrevYear={() => {
          setCalendarChosenYear(calendarChosenYear - 1);
        }}
        onNextYear={() => {
          setCalendarChosenYear(calendarChosenYear + 1);
        }}
      />
      <CalendarYearly
        year={calendarChosenYear}
        customClasses={customClassesData}
        firstDayOfWeek={1}
        onPickDate={onDatePicked}
        selectedDay={calendarSelectedDay}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  calendarStatusData: selectCalendarStatusData,
  calendarChosenYear: selectCalendarChosenYear
});

Calendar.propTypes = {
  setCalendarChosenYear: PropTypes.func,
  setCalendarChosenDay: PropTypes.func,
  calendarChosenYear: PropTypes.number,
  calendarStatusData: PropTypes.object
};

export default connect(mapStateToProps, {
  setCalendarChosenYear,
  setCalendarChosenDay
})(Calendar);
