import React from "react";
import { PropTypes } from "prop-types";

import { PollutionComparison, Map } from "../../components";
// import {SidePollutionCard} from "../../components";

import "./MapSection.scss";

const MapSection = ({ citiesPollutionData }) => {
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
          <PollutionComparison citiesPollutionData={citiesPollutionData} />
          {/* <SidePollutionCard /> */}
        </div>
      </div>
    </div>
  );
};

MapSection.propTypes = {
  citiesPollutionData: PropTypes.array
};

export default MapSection;
