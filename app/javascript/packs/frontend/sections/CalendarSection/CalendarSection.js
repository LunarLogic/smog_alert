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

import {
  Calendar,
  CalendarDailyInfo,
  CalendarLegendBox
} from "../../components";
import { setColor } from "../../helpers";

import "./CalendarSection.scss";
import { calendarLegendContent } from "./calendarLegendContent";

const CalendarSection = ({
  getCalendarStatusData,
  getCalendarValuesData,
  calendarStatusData,
  calendarChosenYear
}) => {
  useEffect(() => {
    getCalendarStatusData(calendarChosenYear, 19);
    getCalendarValuesData(calendarChosenYear, 19);
  }, [calendarChosenYear]);

  const daysGroupedByStatus = calendarStatusData[calendarChosenYear];

  const renderCalendarLegend = () =>
    calendarLegendContent.map(item => {
      let calendarLegendItem;
      if (daysGroupedByStatus) {
        calendarLegendItem = daysGroupedByStatus.find(
          element => element.status === item.status
        );
      }
      return (
        <CalendarLegendBox
          key={item.status}
          status={item.status}
          numberOfDays={
            calendarLegendItem ? calendarLegendItem.days.length : "--"
          }
          backgroundColor={setColor(item)}
        />
      );
    });

  return (
    <div className="calendar-section">
      <CalendarDailyInfo />
      <Calendar />
      <div className="calendar-section__legend">{renderCalendarLegend()}</div>
    </div>
  );
};

CalendarSection.propTypes = {
  getCalendarStatusData: PropTypes.func,
  getCalendarValuesData: PropTypes.func,
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
