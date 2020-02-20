import React, { useEffect } from "react";
import { Chart } from "../../components";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import { PropTypes } from "prop-types";

import "./ChartsSection.scss";

const ChartsSection = () => {
  return (
    <div className="charts-section">
      <div className="charts-section-heading">Wykresy</div>
      <Chart />
    </div>
  );
};

export default ChartsSection;
