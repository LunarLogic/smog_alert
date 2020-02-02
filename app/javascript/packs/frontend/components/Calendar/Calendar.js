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

const Calendar = ({
  getCalendarStatusData,
  getCalendarValuesData,
  calendarStatusData,
  calendarValuesData
}) => {
  useEffect(() => {
    getCalendarStatusData(chosenYear, 19);
    getCalendarValuesData(chosenYear, 19);
  }, []);

  const [chosenYear, setChosenYear] = useState(2019);
  const [pickedDay, setPickedDay] = useState(undefined);

  // const data = calendarStatusData;
  const data = mockData[chosenYear];
  let values;
  console.log(values);

  const onDatePicked = date => {
    setPickedDay(date.format("YYYY-MM-DD"));
    const obj = calendarValuesData;
    values = obj["daily_average_measurements"].find(
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
        customClasses={data}
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
