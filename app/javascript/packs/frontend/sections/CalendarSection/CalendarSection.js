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
  selectCalendarChosenCity,
  selectCalendarChosenCityIndex
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
  calendarChosenCityIndex,
  citiesList
}) => {
  useEffect(() => {
    getCalendarStatusData(calendarChosenYear, calendarChosenCityIndex);
    getCalendarValuesData(calendarChosenYear, calendarChosenCityIndex);
  }, [calendarChosenYear, calendarChosenCityIndex]);

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
          <div className="calendar-section__location-and-data-dropdown__label">
            Wybierz miejscowość
          </div>
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
  calendarChosenCity: PropTypes.string,
  calendarChosenCityIndex: PropTypes.number,
  citiesList: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  calendarChosenCity: selectCalendarChosenCity,
  calendarChosenCityIndex: selectCalendarChosenCityIndex,
  calendarChosenYear: selectCalendarChosenYear,
  calendarStatusData: selectCalendarStatusData,
  citiesList: selectCitiesPollutionDataList
});

export default connect(mapStateToProps, {
  getCalendarStatusData,
  getCalendarValuesData,
  setCalendarChosenCity
})(CalendarSection);
