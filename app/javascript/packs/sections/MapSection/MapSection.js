import React, { useEffect } from "react";
import "./MapSection.scss";
import PollutionComparison from "../../components/PollutionComparison/PollutionComparison";
import Map from "../../components/Map/Map";
// import SidePollutionCard from "../../components/SidePollutionCard/SidePollutionCard";
import pollutionComparisonContent from "../../components/PollutionComparison/pollutionComparisonContent";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getCitiesPollutionData } from "../../redux/map/map.actions";

const MapSection = ({ getCitiesPollutionData, citiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData(pollutionComparisonContent);
  });

  return (
    <div className="map-section">
      <div className="map-section__heading">
        Jakość powietrza w gminie Zabierzów
      </div>
      <div className="map-section__subheading">
        Porównanie zanieczyszczenia powietrza w gminie Zabierzów i okolicy
      </div>
      <div className="map-section__content">
        <div className="map-section__content--map">
          <Map citiesPollutionData={citiesPollutionData} />
        </div>
        <div className="map-section__content--info">
          <PollutionComparison />
          {/* <SidePollutionCard /> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ map: { citiesPollutionData } }) => ({
  citiesPollutionData
});

const mapDispatchToProps = dispatch => ({
  getCitiesPollutionData: citiesPollutionData =>
    dispatch(getCitiesPollutionData(citiesPollutionData))
});

MapSection.propTypes = {
  getCitiesPollutionData: PropTypes.func,
  citiesPollutionData: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(MapSection);
