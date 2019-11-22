import React from "react";
import "./MapSection.scss";
import PollutionBar from "../../PollutionBar/PollutionBar";
import mapSectionContent from "./mapSectionContent";
import Map from "../../../../../assets/images/Map.png";

const MapSection = () => {
  const sortedPollutionData = mapSectionContent.sort(
    (a, b) => b.value - a.value
  );

  const highestPollutionValue = sortedPollutionData[0].value;

  const mapPollutionData = city => {
    const { location, value, color } = city;
    const width = (value * 100) / highestPollutionValue;
    return (
      <PollutionBar
        key={location}
        width={width}
        backgroundColor={color}
        location={location}
        value={value}
      />
    );
  };

  return (
    <div className="map-section">
      <div className="map-section__heading">
        Jakość powietrza w gminie Zabierzów
      </div>
      <div className="map-section__content">
        <div className="map-section__content--map">
          <img src={Map} alt="map" />
        </div>
        <div className="map-section__content--info">
          {sortedPollutionData.map(mapPollutionData)}
        </div>
      </div>
    </div>
  );
};

export default MapSection;
