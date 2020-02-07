import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import {
  getCalendarStatusData,
  getCalendarValuesData,
  setCalendarChosenCity
} from "../../redux/calendar/calendar.actions";
import {
  selectCalendarChosenYear,
  selectCalendarStatusData,
  selectCitiesPollutionDataList,
  selectCalendarChosenCity
} from "../../redux/redux.selectors";

import {
  Calendar,
  CalendarDailyInfo,
  CalendarLegendBox,
  DropdownMenu
} from "../../components";
import { setColor } from "../../helpers";
import { calendarLegendContent } from "./calendarLegendContent";

import "./CalendarSection.scss";

const CalendarSection = ({
  getCalendarStatusData,
  getCalendarValuesData,
  setCalendarChosenCity,
  calendarStatusData,
  calendarChosenYear,
  calendarChosenCity,
  citiesList
}) => {
  useEffect(() => {
    getCalendarStatusData(calendarChosenYear, 19);
    getCalendarValuesData(calendarChosenYear, 19);
  }, [calendarChosenYear]);

  const daysGroupedByStatus = calendarStatusData[calendarChosenYear];

  // Calendar Legend

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
      <div className="calendar-section__location-and-data">
        <div className="calendar-section__location-and-data-dropdown">
          <DropdownMenu
            optionsList={citiesList}
            chosenCityToBeDisplayed={calendarChosenCity}
            handleChosenCity={setCalendarChosenCity}
          />
        </div>
        <CalendarDailyInfo />
      </div>
      <Calendar />
      <div className="calendar-section__legend">{renderCalendarLegend()}</div>
    </div>
  );
};

CalendarSection.propTypes = {
  getCalendarStatusData: PropTypes.func,
  getCalendarValuesData: PropTypes.func,
  setCalendarChosenCity: PropTypes.func,
  calendarStatusData: PropTypes.object,
  calendarChosenYear: PropTypes.number,
  citiesList: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  calendarChosenYear: selectCalendarChosenYear,
  calendarStatusData: selectCalendarStatusData,
  calendarChosenCity: selectCalendarChosenCity,
  citiesList: selectCitiesPollutionDataList
});

export default connect(mapStateToProps, {
  getCalendarStatusData,
  getCalendarValuesData,
  setCalendarChosenCity
})(CalendarSection);
