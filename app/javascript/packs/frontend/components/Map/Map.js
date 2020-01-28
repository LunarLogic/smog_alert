import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./Map.scss";
import { MapContainer, MapPath, MapText, MapDot } from "./Map.styles.jsx";
import mapElements from "./MapElements";
import {
  mapColor,
  noDataColor,
  bpSmallest
} from "../../styles/_variables.scss";

import { setColor } from "../../helpers";
import {
  selectCitiesPollutionData,
  selectMapLocation,
  selectMapHoveredCity
} from "../../redux/redux.selectors";
import {
  getChosenCity,
  getHoveredCity
} from "../../redux/mapSection/mapSection.actions";

const Map = ({
  citiesPollutionData,
  chosenCity,
  getChosenCity,
  hoveredCity,
  getHoveredCity
}) => {
  const findColor = city => {
    let clickedCity = citiesPollutionData.find(
      cityData => cityData.location_name === city
    );

    return clickedCity
      ? setColor(clickedCity.last_hour_measurement)
      : noDataColor;
  };

  const handleColorChange = city => {
    getChosenCity(city);
  };

  const handleHover = city => {
    getHoveredCity(city);
  };

  const removeHover = () => {
    getHoveredCity("");
  };

  const findChosenCityColor = city => {
    if (city === chosenCity) {
      return findColor(city);
    } else if (city === hoveredCity) {
      return findColor(city);
    } else {
      return mapColor;
    }
  };
  const mapStyles = `@media(max-width: ${bpSmallest}) {
    text {font-size: 2.8rem};
  }`;

  let shouldRender = citiesPollutionData.length !== 0;
  return shouldRender ? (
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
        <style>{mapStyles}</style>
        {mapElements.map(element => (
          <MapPath
            key={`${element.location}-map-path`}
            color={findColor(element.location)}
            fill={findChosenCityColor(element.location)}
            opacity={
              chosenCity === element.location ||
              hoveredCity === element.location
                ? "0.5"
                : "1"
            }
            d={element.path}
            onClick={() => handleColorChange(element.location)}
            onMouseOver={() => handleHover(element.location)}
            onMouseOut={removeHover}
          />
        ))}
        {mapElements.map(element => (
          <MapText
            key={`${element.location}-map-text`}
            transform={element.transform}
            onClick={() => handleColorChange(element.location)}
            onMouseOver={() => handleHover(element.location)}
            onMouseOut={removeHover}
          >
            {element.location}
          </MapText>
        ))}
        {mapElements.map(element => (
          <MapDot
            key={`${element.location}-map-dot`}
            cx={element.cx}
            cy={element.cy}
            color={findColor(element.location)}
            r="10.5"
            onClick={() => handleColorChange(element.location)}
            onMouseOver={() => handleHover(element.location)}
            onMouseOut={removeHover}
          />
        ))}
      </MapContainer>
    </div>
  ) : null;
};

Map.propTypes = {
  citiesPollutionData: PropTypes.array,
  chosenCity: PropTypes.string,
  getChosenCity: PropTypes.func,
  hoveredCity: PropTypes.string,
  getHoveredCity: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData,
  chosenCity: selectMapLocation,
  hoveredCity: selectMapHoveredCity
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity)),
  getHoveredCity: hoveredCity => dispatch(getHoveredCity(hoveredCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
