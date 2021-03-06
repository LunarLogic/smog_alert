import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { getCalendarDailyValuesData } from "../../redux/calendar/calendar.actions";
import {
  selectCalendarDailyValuesData,
  selectCalendarChosenDay,
  selectCalendarChosenCityIndex
} from "../../redux/calendar/calendar.selectors";

import {
  CalendarDailyInfoMeasurementName,
  CalendarDailyInfoMeasurementValue,
  CalendarDailyInfoMeasurement,
  CalendarDailyInfoDisclaimer
} from "./CalendarDailyInfo.styles.jsx";
import { setEmot } from "../../helpers";

import "./CalendarDailyInfo.scss";

export const CalendarDailyInfo = ({
  getCalendarDailyValuesData,
  calendarChosenDay,
  calendarChosenCityIndex,
  calendarDailyValues
}) => {
  useEffect(() => {
    getCalendarDailyValuesData(calendarChosenDay, calendarChosenCityIndex);
  }, [calendarChosenDay, calendarChosenCityIndex]);

  const { date, average_values, number_of_measurements } = calendarDailyValues;

  return (
    <div className="calendar-daily-info">
      <div className="calendar-daily-info__box">
        <CalendarDailyInfoMeasurement>
          <CalendarDailyInfoMeasurementName>
            Dzień:
          </CalendarDailyInfoMeasurementName>
          <CalendarDailyInfoMeasurementValue>
            {date}
          </CalendarDailyInfoMeasurementValue>
        </CalendarDailyInfoMeasurement>
      </div>
      <div className="calendar-daily-info__box">
        <div className="calendar-daily-info__box-measurements">
          <CalendarDailyInfoMeasurement>
            <CalendarDailyInfoMeasurementName>
              liczba pomiarów*:
            </CalendarDailyInfoMeasurementName>
            <CalendarDailyInfoMeasurementValue>
              {number_of_measurements}
            </CalendarDailyInfoMeasurementValue>
          </CalendarDailyInfoMeasurement>
          {average_values &&
            average_values.map(measurement => (
              <CalendarDailyInfoMeasurement key={measurement.name}>
                <CalendarDailyInfoMeasurementName>
                  {measurement.name}:
                </CalendarDailyInfoMeasurementName>
                <CalendarDailyInfoMeasurementValue>
                  {measurement.value ? Math.round(measurement.value) : "--"}μg
                </CalendarDailyInfoMeasurementValue>
              </CalendarDailyInfoMeasurement>
            ))}
        </div>
        <div className="calendar-daily-info__box-emot">
          {setEmot(calendarDailyValues)}
        </div>
      </div>
      <div>
        <CalendarDailyInfoDisclaimer>
          * Pomiar wykonywany jest raz na godzinę.
        </CalendarDailyInfoDisclaimer>
        <CalendarDailyInfoDisclaimer>
          ** Średnia wartość PM 10 w postaci kolorowej ikony prezentowana jest
          przy co najmniej 18 pomiarach
        </CalendarDailyInfoDisclaimer>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  calendarChosenDay: selectCalendarChosenDay,
  calendarChosenCityIndex: selectCalendarChosenCityIndex,
  calendarDailyValues: selectCalendarDailyValuesData
});

CalendarDailyInfo.propTypes = {
  getCalendarDailyValuesData: PropTypes.func,
  calendarChosenDay: PropTypes.string,
  calendarDailyValues: PropTypes.object,
  calendarChosenCityIndex: PropTypes.number
};

export default connect(mapStateToProps, { getCalendarDailyValuesData })(
  CalendarDailyInfo
);
