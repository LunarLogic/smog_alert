import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { withRouter } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import { getCitiesPollutionData } from "../../redux/homepage/homepage.actions";
import { selectCitiesPollutionData } from "../../redux/redux.selectors";

import "./Statistics.scss";
import { Calendar } from "../../components";
import { DropdownMenu } from "../../components/DropdownMenu/DropdownMenu";

const Statistics = ({ citiesPollutionData, getCitiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData();
  }, []);
  const cities = citiesPollutionData;
  return cities ? (
    <div>
      {/* <DropdownMenu /> */}
      <Calendar />
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData
});

Statistics.propTypes = {
  citiesPollutionData: PropTypes.func
};

export default withRouter(
  connect(mapStateToProps, { getCitiesPollutionData })(Statistics)
);
