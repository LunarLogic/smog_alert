import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getCitiesPollutionData } from "../../redux/homepage/homepage.actions";

import { CurrentPollutionSection, MapSection } from "../../sections";
import { Searchbox } from "../../components";
import data from "./data";

import "./Homepage.scss";

const Homepage = ({ getCitiesPollutionData, citiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData();
  }, []);
  console.log(citiesPollutionData);

  return (
    <div className="homepage">
      <Searchbox cities={data.map(item => item.location)} data={data} />
      <CurrentPollutionSection />
      <hr className="homepage__horizontal-line" />
      <MapSection citiesPollutionData={citiesPollutionData} />
    </div>
  );
};

const mapStateToProps = ({ homepage: { citiesPollutionData } }) => ({
  citiesPollutionData
});

Homepage.propTypes = {
  getCitiesPollutionData: PropTypes.func,
  citiesPollutionData: PropTypes.array
};

export default connect(mapStateToProps, { getCitiesPollutionData })(Homepage);
