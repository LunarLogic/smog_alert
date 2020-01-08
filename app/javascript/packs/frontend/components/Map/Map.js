import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./Map.scss";
import { MapContainer, MapPath, MapText, MapDot } from "./Map.styles.jsx";
import mapElements from "./MapElements";
import { mapColor } from "../../styles/_variables.scss";

import { setColor } from "../../helpers";
import {
  selectCitiesPollutionData,
  selectMapLocation
} from "../../redux/redux.selectors";
import { getChosenCity } from "../../redux/mapSection/mapSection.actions";

const Map = ({ citiesPollutionData, chosenCity, getChosenCity }) => {
  const findColor = city => {
    let clickedCity = citiesPollutionData.find(
      cityData => cityData.location_name === city
    );
    let color = setColor(clickedCity.last_hour_measurement.status);
    return color;
  };

  const handleColorChange = city => {
    getChosenCity(city);
  };

  const findChosenCityColor = city => {
    if (city === chosenCity) {
      return findColor(city);
    } else {
      return mapColor;
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
                key={`${element.location}-path`}
                color={findColor(element.location)}
                fill={findChosenCityColor(element.location)}
                opacity={chosenCity === element.location ? "0.5" : "1"}
                d={element.path}
                onClick={() => handleColorChange(element.location)}
              />
            ))}
            {mapElements.map(element => (
              <MapText
                key={`${element.location}-text`}
                transform={element.transform}
                onClick={() => handleColorChange(element.location)}
              >
                {element.location}
              </MapText>
            ))}
            {mapElements.map(element => (
              <MapDot
                key={`${element.location}-dot`}
                cx={element.cx}
                cy={element.cy}
                color={findColor(element.location)}
                r="10.5"
                onClick={() => handleColorChange(element.location)}
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
  chosenCity: PropTypes.string,
  getChosenCity: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  citiesPollutionData: selectCitiesPollutionData,
  chosenCity: selectMapLocation
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
