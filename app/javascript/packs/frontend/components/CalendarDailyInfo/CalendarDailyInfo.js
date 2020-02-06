import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCalendarValuesData,
  selectCalendarChosenDay
} from "../../redux/redux.selectors";

const CalendarDailyInfo = ({ calendarChosenDay, calendarValues }) => {
  const calendarYearlyValues = calendarValues["daily_average_measurements"];
  let calendarDailyValues;

  if (calendarYearlyValues) {
    calendarDailyValues = calendarYearlyValues.find(
      item => item.day === calendarChosenDay
    );
  }

  if (calendarDailyValues) {
    var { day, pm10, pm25, number_of_measurements } = calendarDailyValues;
  }

  return (
    <div>
      <div>
        Uśrednione dane z dnia: {day ? day : "[ Kliknij na wybrany dzień ]"}
      </div>
      <div>PM 10: {pm10 ? pm10 : "--"}</div>
      <div>PM 2.5: {pm25 ? pm25 : "--"}</div>
      <div>
        Liczba pomiarów:
        {number_of_measurements ? number_of_measurements : "---"}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  calendarChosenDay: selectCalendarChosenDay,
  calendarValues: selectCalendarValuesData
});

CalendarDailyInfo.propTypes = {
  calendarChosenDay: PropTypes.string,
  calendarValues: PropTypes.object
};

export default connect(mapStateToProps)(CalendarDailyInfo);
