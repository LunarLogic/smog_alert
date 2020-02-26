import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { selectCitiesPollutionDataList } from "../../redux/redux.selectors";
import {
  selectChartChosenCity,
  selectChartChosenIndicator,
  selectChartChosenCityIndex
} from "../../redux/charts/charts.selectors";
import {
  setChartChosenCity,
  setChartChosenIndicator,
  getChartHourlyAverageForMonthData
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
  getChartHourlyAverageForMonthData,
  chartChosenCityIndex
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [indicator, setIndicator] = useState("PM 10");
  const [chartChosenMonth, setChartChosenMonth] = useState(
    formatMonthlyDate(new Date())
  );

  useEffect(() => {
    getChartHourlyAverageForMonthData(chartChosenMonth, chartChosenCityIndex);
  }, []);

  const indicatorsList = ["PM 10", "PM 2.5"];
  const setDate = date => {
    setStartDate(date);
    setChartChosenMonth(formatMonthlyDate(date));
  };

  const refreshChartData = () => {
    getChartHourlyAverageForMonthData(chartChosenMonth, chartChosenCityIndex);
    setIndicator(chartChosenIndicator);
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
      <div onClick={refreshChartData}>
        <CustomButton text="Zastosuj" />
      </div>
      <Chart indicator={indicator} />
    </div>
  );
};

ChartsSection.propTypes = {
  setChartChosenCity: PropTypes.func,
  setChartChosenIndicator: PropTypes.func,
  setChartChosenMonth: PropTypes.func,
  getChartHourlyAverageForMonthData: PropTypes.func,
  citiesList: PropTypes.array,
  chartChosenCity: PropTypes.string,
  chartChosenIndicator: PropTypes.string,
  chartChosenCityIndex: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  citiesList: selectCitiesPollutionDataList,
  chartChosenCity: selectChartChosenCity,
  chartChosenIndicator: selectChartChosenIndicator,
  chartChosenCityIndex: selectChartChosenCityIndex
});

export default connect(mapStateToProps, {
  setChartChosenCity,
  setChartChosenIndicator,
  getChartHourlyAverageForMonthData
})(ChartsSection);
