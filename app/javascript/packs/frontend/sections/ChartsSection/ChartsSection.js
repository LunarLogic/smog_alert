import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { selectCitiesPollutionDataList } from "../../redux/redux.selectors";
import {
  selectChartChosenCity,
  selectChartChosenIndicator
} from "../../redux/charts/charts.selectors";
import {
  setChartChosenCity,
  setChartChosenIndicator,
  setChartChosenMonth
} from "../../redux/charts/charts.actions";

import { formatMonthlyDate } from "../../helpers";
import { Chart, CustomButton, DropdownMenu } from "../../components";

import "./ChartsSection.scss";

export const ChartsSection = ({
  citiesList,
  chartChosenCity,
  chartChosenIndicator,
  setChartChosenCity,
  setChartChosenIndicator,
  setChartChosenMonth
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const indicatorsList = ["PM 10", "PM 2.5"];
  const setDate = date => {
    setStartDate(date);
    setChartChosenMonth(formatMonthlyDate(date));
  };

  return (
    <div className="charts-section">
      <div className="charts-section-heading">Statystyki</div>
      <div className="charts-section-options">
        <div className="charts-section-dropdown">
          <div className="charts-section-dropdown__label">Wybierz wskaźnik</div>
          <div className="charts-section-dropdown__menu">
            <DropdownMenu
              optionsList={indicatorsList}
              chosenCityToBeDisplayed={chartChosenIndicator}
              handleChosenCity={setChartChosenIndicator}
            />
          </div>
        </div>
        <div className="charts-section-dropdown">
          <div className="charts-section-dropdown__label">
            Wybierz miejscowość
          </div>
          <div className="charts-section-dropdown__menu">
            <DropdownMenu
              optionsList={citiesList}
              chosenCityToBeDisplayed={chartChosenCity}
              handleChosenCity={setChartChosenCity}
            />
          </div>
        </div>
        <div className="charts-section-dropdown">
          <div className="charts-section-dropdown__label">Wybierz miesiąc</div>
          <div className="charts-section-date-picker">
            <DatePicker
              selected={startDate}
              onChange={date => setDate(date)}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
        </div>
      </div>
      <CustomButton text="Zastosuj" />
      <Chart />
    </div>
  );
};

ChartsSection.propTypes = {
  setChartChosenCity: PropTypes.func,
  setChartChosenIndicator: PropTypes.func,
  setChartChosenMonth: PropTypes.func,
  citiesList: PropTypes.array,
  chartChosenCity: PropTypes.string,
  chartChosenIndicator: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectCitiesPollutionDataList,
  chartChosenCity: selectChartChosenCity,
  chartChosenIndicator: selectChartChosenIndicator
});

export default connect(mapStateToProps, {
  setChartChosenCity,
  setChartChosenIndicator,
  setChartChosenMonth
})(ChartsSection);
