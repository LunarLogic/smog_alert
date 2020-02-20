import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

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
  return (
    <div className="charts-section">
      <div className="charts-section-heading">Wykresy</div>
      <div className="charts-section-heading-dropdown__label">
        Wybierz miejscowość
      </div>
      <DropdownMenu
        optionsList={citiesList}
        chosenCityToBeDisplayed={chartChosenCity}
        handleChosenCity={setChartChosenCity}
      />
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
