import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { setColor } from "../../helpers";
import {
  selectCitiesPollutionData,
  selectMapLocation
} from "../../redux/redux.selectors";

import "./Map.scss";
import { MapContainer, MapPath, MapText, MapDot } from "./Map.styles.jsx";
import mapElements from "./MapElements";

const Map = ({ citiesPollutionData, chosenCity }) => {
  const findColor = city => {
    let chosenCity2 = citiesPollutionData.find(
      cityData => cityData.location_name === city
    );
    let color = setColor(chosenCity2.last_hour_measurement.status);
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

  const findChosenCityColor = city => {
    if (city === chosenCity) {
      return findColor(city);
    } else {
      return "#e5e6e6";
    }
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
                id={element.location}
                key={element.location}
                color={findColor(element.location)}
                fill={findChosenCityColor(element.location)}
                opacity={chosenCity === element.location ? "0.5" : "1"}
                d={element.path}
                onClick={handleColorChange}
              />
            ))}
            {mapElements.map(element => (
              <MapText
                key={element.location}
                transform={element.transform}
                onClick={handleColorChange}
              >
                {element.location}
              </MapText>
            ))}
            {mapElements.map(element => (
              <MapDot
                key={element.location}
                cx={element.cx}
                cy={element.cy}
                color={findColor(element.location)}
                r="10.5"
              />
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
};

Map.propTypes = {
  citiesPollutionData: PropTypes.array,
  chosenCity: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData,
  chosenCity: selectMapLocation
});

export default connect(mapStateToProps)(Map);
