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

import {
  changePickedDateIntoText,
  findPreviousMonth,
  formatMonthlyDate
} from "../../helpers";
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
  const [pickerDate, setPickerDate] = useState(findPreviousMonth(new Date()));
  const [indicator, setIndicator] = useState("PM 10");
  const [chartChosenMonth, setChartChosenMonth] = useState(
    formatMonthlyDate(findPreviousMonth(new Date()))
  );
  const [chartChosenDateText, setChartChosenDateText] = useState(
    changePickedDateIntoText(pickerDate)
  );

  useEffect(() => {
    getChartHourlyAverageForMonthData(chartChosenMonth, chartChosenCityIndex);
  }, []);

  const indicatorsList = ["PM 10", "PM 2.5"];

  const setDate = date => {
    setPickerDate(date);
    setChartChosenMonth(formatMonthlyDate(date));
  };

  const refreshChartData = () => {
    getChartHourlyAverageForMonthData(chartChosenMonth, chartChosenCityIndex);
    setIndicator(chartChosenIndicator);
    setChartChosenDateText(changePickedDateIntoText(pickerDate));
  };

  return (
    <div className="charts-section">
      <div className="charts-section__heading">Statystyki</div>
      <div className="charts-section__options">
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
              selected={pickerDate}
              onChange={date => setDate(date || new Date())}
              minDate={new Date().getFullYear() - 2}
              maxDate={new Date()}
              dateFormat="MM/yyyy"
              showMonthYearPicker
            />
          </div>
        </div>
      </div>
      <div className="charts-section__submit" onClick={refreshChartData}>
        <CustomButton text="Zastosuj" />
      </div>
      <div className="charts-section__subheading">
        Średnia godzinowa wartość wskaźnika{" "}
        <span className="charts-section__subheading--bold">{indicator}</span> w
        miesiącu{" "}
        <span className="charts-section__subheading--bold">
          {chartChosenDateText}
        </span>
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
