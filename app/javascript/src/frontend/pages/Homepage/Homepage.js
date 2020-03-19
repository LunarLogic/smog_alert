import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { getCitiesPollutionData } from "../../redux/homepage/homepage.actions";
import { setCurrentPath } from "../../redux/application/application.actions";

import { CurrentPollutionSection, MapSection } from "../../sections";
import { PageTitle } from "../../components";

import "./Homepage.scss";

export const Homepage = ({ match, getCitiesPollutionData, setCurrentPath }) => {
  useEffect(() => {
    setCurrentPath(match.path);
    getCitiesPollutionData();
  }, []);
  return (
    <main className="homepage">
      <PageTitle title="Aktualny stan powietrza" />
      <CurrentPollutionSection />
      <hr className="homepage__horizontal-line" />
      <MapSection />
    </main>
  );
};

const mapDispatchToProps = dispatch => ({
  getCitiesPollutionData: () => dispatch(getCitiesPollutionData()),
  setCurrentPath: path => dispatch(setCurrentPath(path))
});

Homepage.propTypes = {
  getCitiesPollutionData: PropTypes.func,
  match: PropTypes.object,
  setCurrentPath: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Homepage);
