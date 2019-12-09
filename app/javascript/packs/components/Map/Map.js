import React, { useEffect } from "react";
import "./Map.scss";
import { MapContainer, MapPath, MapText } from "./MapImage.styles.jsx";
import Dot from "../Dot/Dot";
import { getCitiesPollutionData } from "../../redux/map/map.actions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import pollutionComparisonContent from "../PollutionComparison/pollutionComparisonContent";
import mapElements from "./MapElements";

const Map = ({ citiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData(pollutionComparisonContent);
  });

  const findColor = city => {
    let color = citiesPollutionData.find(cityData => cityData.location === city)
      .color;
    return color;
  };

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

  let shouldRender = citiesPollutionData.length !== 0;

  return (
    <div>
      {shouldRender && (
        <div className="map">
          <MapContainer
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 725 656"
            style={{ enableBackground: "new 0 0 725 656" }}
            xmlSpace="preserve"
          >
            {mapElements.map(element => (
              <MapPath
                key={element.location}
                color={findColor(element.location)}
                d={element.path}
              />
            ))}
            {mapElements.map(element => (
              <MapText key={element.location} transform={element.transform}>
                {element.location}
              </MapText>
            ))}
          </MapContainer>
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
      )}
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
