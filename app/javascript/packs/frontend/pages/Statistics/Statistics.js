import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { getCitiesPollutionData } from "../../redux/homepage/homepage.actions";
import { selectCitiesPollutionData } from "../../redux/redux.selectors";

import { CalendarSection } from "../../sections";

import "./Statistics.scss";

const Statistics = ({ citiesPollutionData, getCitiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData();
  }, []);

  const cities = citiesPollutionData;

  return cities.length ? (
    <div className="statistics">
      <CalendarSection />
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData
});

Statistics.propTypes = {
  getCitiesPollutionData: PropTypes.func,
  citiesPollutionData: PropTypes.array
};

export default withRouter(
  connect(mapStateToProps, { getCitiesPollutionData })(Statistics)
);
