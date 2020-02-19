import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { getCitiesPollutionData } from "../../redux/homepage/homepage.actions";
import { setCurrentPath } from "../../redux/application/application.actions";
import { selectCitiesPollutionData } from "../../redux/redux.selectors";

import { CalendarSection, ChartsSection } from "../../sections";
import { Loader, PageTitle } from "../../components";

import "./Statistics.scss";

const Statistics = ({
  match,
  citiesPollutionData,
  getCitiesPollutionData,
  setCurrentPath
}) => {
  useEffect(() => {
    setCurrentPath(match.path);
    getCitiesPollutionData();
  }, []);

  const cities = citiesPollutionData;
  const loaderStyles = {
    height: "75vh"
  };

  return cities.length ? (
    <div className="statistics">
      <PageTitle title="Statystyki" />
      <CalendarSection />
      <ChartsSection />
    </div>
  ) : (
    <Loader className="statistics__loader" loaderStyles={loaderStyles} />
  );
};

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData
});

const mapDispatchToProps = dispatch => ({
  getCitiesPollutionData: () => dispatch(getCitiesPollutionData()),
  setCurrentPath: path => dispatch(setCurrentPath(path))
});

Statistics.propTypes = {
  match: PropTypes.object,
  getCitiesPollutionData: PropTypes.func,
  citiesPollutionData: PropTypes.array,
  setCurrentPath: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Statistics)
);
