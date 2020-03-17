import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";

import { DropdownMenu, Loader } from "..";
import { setColor } from "../../helpers";

import "./PollutionSideCard.scss";

import { getChosenCity } from "../../redux/mapSection/mapSection.actions";
import {
  selectMapChosenCityData,
  selectCitiesPollutionData,
  selectMapLocation
} from "../../redux/redux.selectors";
import PollutionSpecificData from "../PollutionSpecificData/PollutionSpecificData";

export const PollutionSideCard = ({
  citiesPollutionData,
  chosenCityData,
  getChosenCity,
  chosenCity
}) => {
  const removeChosenCity = () => {
    getChosenCity("");
  };


  // List of cities for dropdown component
  let dropdownOptions = [];

  const checkOptions = city => {
    return (
      dropdownOptions.length === 0 ||
      !dropdownOptions.find(element => element === city.location_name)
    );
  };

  citiesPollutionData.forEach(city => {
    if (checkOptions(city)) {
      dropdownOptions.push(city.location_name);
    }
  });


  const loaderStyles = {
    height: "62.7rem"
  };

  return chosenCityData ? (
    <div className="side-pollution-card">
      <div
        className="side-pollution-card__return-button"
        onClick={removeChosenCity}
      >
        <ArrowBackIcon />
        <div className="side-pollution-card__return-button--text">
          Wróć do porównania
        </div>
      </div>
      <div className="side-pollution-card__content">
        <div className="side-pollution-card__content--dropdown">
          <div className="side-pollution-card__content--dropdown-label">
            Wybierz miejscowość
          </div>
          <div className="side-pollution-card__content--dropdown-options">
            <DropdownMenu
              optionsList={dropdownOptions}
              handleChosenCity={getChosenCity}
              chosenCityToBeDisplayed={chosenCity}
            />
          </div>
        </div>
        {chosenCityData.map(data => {
          const color = setColor(data.last_hour_measurement);
          return (
            <PollutionSpecificData
              key={data.location_display_name}
              display_name={data.location_display_name}
              color={color}
              lastHourMeasurement={data.last_hour_measurement}
              status={
                data.last_hour_measurement
                  ? data.last_hour_measurement.status
                  : "brak pomiaru"
              }
              data={
                data.last_hour_measurement
                  ? data.last_hour_measurement.values
                  : [
                      { name: "PM 10", value: null },
                      { name: "PM 2.5", value: null }
                    ]
              }
            />
          );
        })}
      </div>
    </div>
  ) : (
    <Loader
      className="side-pollution-card__loader"
      loaderStyles={loaderStyles}
    />
  );
};

PollutionSideCard.propTypes = {
  citiesPollutionData: PropTypes.array,
  chosenCityData: PropTypes.array,
  getChosenCity: PropTypes.func,
  chosenCity: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  chosenCityData: selectMapChosenCityData,
  chosenCity: selectMapLocation,
  citiesPollutionData: selectCitiesPollutionData
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: mapChosenCity => dispatch(getChosenCity(mapChosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(PollutionSideCard);
