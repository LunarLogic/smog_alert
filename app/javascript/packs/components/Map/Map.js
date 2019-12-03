import React, { useEffect } from "react";
import "./Map.scss";
import MapImage from "../../../../assets/images/map.svg";
import SVG from "react-inlinesvg";
import Dot from "../Dot/Dot";
import { getCitiesPollutionData } from "../../redux/map/map.actions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import pollutionComparisonContent from "../PollutionComparison/pollutionComparisonContent";

const Map = ({ citiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData(pollutionComparisonContent);
  });

  let previouslyClickedElement;

  const handleColorChange = event => {
    let clickedElement = event.target;
    let pathId;
    switch (clickedElement.tagName) {
      case "path":
        pathId = clickedElement.id;
        break;
      case "DIV":
        pathId = clickedElement.id.replace("dot--", "");
        clickedElement = document.getElementById(pathId);
        break;
      case "text":
        pathId = clickedElement.textContent;
        clickedElement = document.getElementById(pathId);
    }
    if (previouslyClickedElement) {
      previouslyClickedElement.removeAttribute("style");
    }
    citiesPollutionData.forEach(cityData => {
      if (cityData.location === pathId) {
        clickedElement.style.fill = cityData.color;
        clickedElement.style.opacity = 0.5;
        previouslyClickedElement = clickedElement;
      }
    });
  };

  return (
    <div className="map">
      <SVG src={MapImage} className="map__image" onClick={handleColorChange} />
      {citiesPollutionData.map(cityData => (
        <Dot
          key={cityData.id}
          id={`dot--${cityData.location}`}
          className={`dot--${cityData.location}`}
          backgroundColor={cityData.color}
          onClick={handleColorChange}
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getCitiesPollutionData: citiesPollutionData =>
    dispatch(getCitiesPollutionData(citiesPollutionData))
});

const mapStateToProps = ({ map: { citiesPollutionData } }) => ({
  citiesPollutionData
});

Map.propTypes = {
  getCitiesPollutionData: PropTypes.func,
  citiesPollutionData: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
