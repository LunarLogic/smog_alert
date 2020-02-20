import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { selectCitiesPollutionDataList } from "../../redux/redux.selectors";
import { selectChartChosenCity } from "../../redux/charts/charts.selectors";
import { setChartChosenCity } from "../../redux/charts/charts.actions";

import { Chart, DropdownMenu } from "../../components";

import "./ChartsSection.scss";

export const ChartsSection = ({
  citiesList,
  chartChosenCity,
  setChartChosenCity
}) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="charts-section">
      <div className="charts-section-heading">Statystyki</div>
      <div className="charts-section-dropdown__label">Wybierz miejscowość</div>
      <div className="charts-section-dropdown__menu">
        <DropdownMenu
          optionsList={citiesList}
          chosenCityToBeDisplayed={chartChosenCity}
          handleChosenCity={setChartChosenCity}
        />
      </div>
      <div className="charts-section-dropdown__label">Wybierz miesiąc</div>
      <div className="charts-section-date-picker">
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>
      <Chart />
    </div>
  );
};

ChartsSection.propTypes = {
  setChartChosenCity: PropTypes.func,
  citiesList: PropTypes.array,
  chartChosenCity: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectCitiesPollutionDataList,
  chartChosenCity: selectChartChosenCity
});

export default connect(mapStateToProps, { setChartChosenCity })(ChartsSection);
