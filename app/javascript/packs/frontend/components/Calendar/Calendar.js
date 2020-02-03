import React, { useEffect, useState } from "react";
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

import mockData from "./CalendarMockData.json";
import "./Calendar.scss";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import { setClassName } from "../../helpers";

const Calendar = ({
  getCalendarStatusData,
  getCalendarValuesData,
  calendarStatusData,
  calendarValuesData
}) => {
  const [chosenYear, setChosenYear] = useState(new Date().getFullYear());
  const [pickedDay, setPickedDay] = useState(undefined);

  useEffect(() => {
    getCalendarStatusData(chosenYear, 19);
    getCalendarValuesData(chosenYear, 19);
  }, [chosenYear]);

  // Get status data and convert it to the object used by Calendar to set custom css classes

  const statusData = calendarStatusData[chosenYear];
  let customClassesData = {};
  if (statusData) {
    statusData.forEach(
      item => (customClassesData[setClassName(item.status)] = item.days)
    );
  }

  let values;

  const onDatePicked = date => {
    setPickedDay(date.format("YYYY-MM-DD"));
    const valuesData = calendarValuesData;
    values = valuesData["daily_average_measurements"].find(
      item => item.day === pickedDay
    );
    console.log(values);
  };

  return (
    <div className="calendar">
      <CalendarControls
        year={chosenYear}
        onPrevYear={() => {
          setChosenYear(chosenYear - 1);
        }}
        onNextYear={() => {
          setChosenYear(chosenYear + 1);
        }}
      />
      <CalendarYearly
        year={chosenYear}
        customClasses={customClassesData}
        firstDayOfWeek={1}
        onPickDate={onDatePicked}
      />
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
