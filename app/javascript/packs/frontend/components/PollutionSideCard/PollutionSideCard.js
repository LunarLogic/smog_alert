import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";

import { DropdownMenu } from "..";
import { setColor } from "../../helpers";

import "./PollutionSideCard.scss";

import { getChosenCity } from "../../redux/mapSection/mapSection.actions";
import { selectMapChosenCityData } from "../../redux/redux.selectors";
import PollutionSpecificData from "../PollutionSpecificData/PollutionSpecificData";

export const PollutionSideCard = ({ chosenCityData, getChosenCity }) => {
  const removeChosenCity = () => {
    getChosenCity("");
  };

  return (
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
            <DropdownMenu />
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
                      { name: "PM 10", value: "--" },
                      { name: "PM 2.5", value: "--" }
                    ]
              }
            />
          );
        })}
      </div>
    </div>
  );
};

PollutionSideCard.propTypes = {
  chosenCityData: PropTypes.array,
  getChosenCity: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  chosenCityData: selectMapChosenCityData
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(PollutionSideCard);
