import React from "react";
import "./MapSection.scss";
import PollutionComparison from "../../components/PollutionComparison/PollutionComparison";
import Map from "../../components/Map/Map";

const MapSection = () => {
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
          <Map />
        </div>
        <div className="map-section__content--info">
          <PollutionComparison />
        </div>
      </div>
    </div>
  );
};

export default MapSection;
