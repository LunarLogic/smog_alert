import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import {
  getCalendarStatusData,
  getCalendarValuesData
} from "../../redux/calendar/calendar.actions";
import {
  selectCalendarChosenYear,
  selectCalendarStatusData
} from "../../redux/redux.selectors";

import { Calendar, CalendarLegendBox } from "../../components";
import { classNameForPollutionStatus } from "../../helpers";

import "./CalendarSection.scss";
import mockData from "../../components/Calendar/CalendarMockData.json";

const CalendarSection = ({
  getCalendarStatusData,
  calendarStatusData,
  calendarChosenYear
}) => {
  useEffect(() => {
    getCalendarStatusData(calendarChosenYear, 19);
  }, [calendarChosenYear]);

  const statusData = calendarStatusData[calendarChosenYear];
  const renderScale = data =>
    data.map(item => (
      <CalendarLegendBox
        key={item.status}
        status={item.status}
        numberOfDays={item.days.length}
        customClassName={`calendar-legend-${classNameForPollutionStatus(
          item.status
        )}`}
      />
    ));

  return (
    <div className="calendar-section">
      <Calendar />
      <div className="calendar-section__legend">
        {statusData && renderScale(statusData)}
      </div>
    </div>
  );
};

CalendarSection.propTypes = {
  getCalendarStatusData: PropTypes.func,
  calendarStatusData: PropTypes.object,
  calendarChosenYear: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  calendarChosenYear: selectCalendarChosenYear,
  calendarStatusData: selectCalendarStatusData
});

export default connect(mapStateToProps, {
  getCalendarStatusData,
  getCalendarValuesData
})(CalendarSection);
