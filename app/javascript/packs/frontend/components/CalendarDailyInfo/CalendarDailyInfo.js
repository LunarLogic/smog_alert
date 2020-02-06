import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCalendarValuesData,
  selectCalendarChosenDay
} from "../../redux/redux.selectors";

import {
  CalendarDailyInfoNoData,
  CalendarDailyInfoMeasurementName,
  CalendarDailyInfoMeasurementValue,
  CalendarDailyInfoMeasurement,
  CalendarDailyInfoDisclaimer
} from "./CalendarDailyInfo.styles.jsx";
import "./CalendarDailyInfo.scss";

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
    <div className="calendar-daily-info">
      <div className="calendar-daily-info__box">
        <CalendarDailyInfoMeasurement>
          <CalendarDailyInfoMeasurementName>
            DZIEŃ:
          </CalendarDailyInfoMeasurementName>
          {day ? (
            <CalendarDailyInfoMeasurementValue>
              {day}
            </CalendarDailyInfoMeasurementValue>
          ) : (
            <CalendarDailyInfoNoData>
              [ Kliknij na wybrany dzień ]
            </CalendarDailyInfoNoData>
          )}
        </CalendarDailyInfoMeasurement>
      </div>
      <div className="calendar-daily-info__box">
        <CalendarDailyInfoMeasurement>
          <CalendarDailyInfoMeasurementName>
            PM 10:
          </CalendarDailyInfoMeasurementName>
          <CalendarDailyInfoMeasurementValue>
            {pm10 ? Math.round(pm10) : "--"}μg
          </CalendarDailyInfoMeasurementValue>
        </CalendarDailyInfoMeasurement>
        <CalendarDailyInfoMeasurement>
          <CalendarDailyInfoMeasurementName>
            PM 2.5:
          </CalendarDailyInfoMeasurementName>
          <CalendarDailyInfoMeasurementValue>
            {pm25 ? Math.round(pm25) : "--"}μg
          </CalendarDailyInfoMeasurementValue>
        </CalendarDailyInfoMeasurement>
        <CalendarDailyInfoMeasurement>
          <CalendarDailyInfoMeasurementName>
            LICZBA POMIAROW:
          </CalendarDailyInfoMeasurementName>
          <CalendarDailyInfoMeasurementValue>
            {number_of_measurements ? number_of_measurements : "--"}
          </CalendarDailyInfoMeasurementValue>
        </CalendarDailyInfoMeasurement>
      </div>
      <div>
        <CalendarDailyInfoDisclaimer>
          * Średnia wartość na podstawie co najmniej 18 pomiarów
        </CalendarDailyInfoDisclaimer>
        <CalendarDailyInfoDisclaimer>
          ** Pomiar wykonywany jest raz na godzinę.
        </CalendarDailyInfoDisclaimer>
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
