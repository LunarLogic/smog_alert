import React from "react";
import "./MapSection.scss";
import Map from "../../../../assets/images/Map.png";
import PollutionComparison from "../../components/PollutionComparison/PollutionComparison";

const MapSection = () => {
  return (
    <div className="map-section">
      <div className="map-section__heading">
        Jakość powietrza w gminie Zabierzów
      </div>
      <div className="map-section__content">
        <div className="map-section__content--map">
          <img src={Map} alt="map" />
        </div>
        <PollutionComparison />
      </div>
    </div>
  );
};

export default MapSection;
