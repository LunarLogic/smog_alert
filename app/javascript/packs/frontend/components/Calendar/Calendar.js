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
  selectCalendarValuesData,
  selectCalendarChosenYear
} from "../../redux/redux.selectors";
import { setCalendarChosenYear } from "../../redux/calendar/calendar.actions";

import { classNameForPollutionStatus } from "../../helpers";

import mockData from "./CalendarMockData.json";
import "./Calendar.scss";

const Calendar = ({
  setCalendarChosenYear,
  calendarStatusData,
  calendarValuesData,
  calendarChosenYear
}) => {
  const [pickedDay, setPickedDay] = useState(undefined);

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

  // Get additional data regarding chosen day on click

  let values;
  const onDatePicked = date => {
    setPickedDay(date.format("YYYY-MM-DD"));
    const valuesData = calendarValuesData;
    values = valuesData["daily_average_measurements"].find(
      item => item.day === pickedDay
    );
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
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  calendarStatusData: selectCalendarStatusData,
  calendarValuesData: selectCalendarValuesData,
  calendarChosenYear: selectCalendarChosenYear
});

Calendar.propTypes = {
  setCalendarChosenYear: PropTypes.func,
  calendarChosenYear: PropTypes.number,
  calendarStatusData: PropTypes.object,
  calendarValuesData: PropTypes.object
};

export default connect(mapStateToProps, { setCalendarChosenYear })(Calendar);
