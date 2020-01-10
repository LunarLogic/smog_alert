import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getCitiesPollutionData } from "../../redux/homepage/homepage.actions";

import { CurrentPollutionSection, MapSection } from "../../sections";
import { Searchbox } from "../../components";

import "./Homepage.scss";

const Homepage = ({ getCitiesPollutionData, citiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData();
  }, []);

  return (
    <div className="homepage">
      <Searchbox
        cities={citiesPollutionData.map(item => item.location_display_name)}
      />
      <CurrentPollutionSection />
      <hr className="homepage__horizontal-line" />
      <MapSection />
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
