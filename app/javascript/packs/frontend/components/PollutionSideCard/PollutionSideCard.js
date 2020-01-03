import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";

import { PollutionIndexData, DropdownMenu } from "..";
import { setPercent, setColor } from "../../helpers";

import "./PollutionSideCard.scss";
import {
  PollutionOverviewFace,
  PollutionOverviewText
} from "./PollutionSideCard.styles.jsx";

import { getChosenCity } from "../../redux/mapSection/mapSection.actions";
import { selectMapChosenCityData } from "../../redux/redux.selectors";

const PollutionSideCard = ({ chosenCityData, getChosenCity }) => {
  const color = setColor(chosenCityData.last_hour_measurement.status);

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
            <DropdownMenu value={chosenCityData.location_name} />
          </div>
        </div>
        <div className="side-pollution-card__content--air-quality">
          <div className="side-pollution-card__content--air-quality-label">
            Aktualna jakość powietrza
          </div>
          <div className="side-pollution-card__content--air-quality-info">
            <div className="side-pollution-card__content--air-quality-info-overview">
              <PollutionOverviewFace color={color} />
              <PollutionOverviewText color={color}>
                {chosenCityData.last_hour_measurement.status}
              </PollutionOverviewText>
            </div>
            <div className="side-pollution-card__content--air-quality-info-specific">
              {/* Below solution is temporary - changing it will probably require some changes in the structure of an object recieved from API */}
              <PollutionIndexData
                indicator="PM 10"
                value={chosenCityData.last_hour_measurement.values.pm10}
                percent={setPercent(
                  "PM 10",
                  chosenCityData.last_hour_measurement.values.pm10
                )}
                limit="50"
              />
              <PollutionIndexData
                indicator="PM 2.5"
                value={chosenCityData.last_hour_measurement.values.pm25}
                percent={setPercent(
                  "PM 2.5",
                  chosenCityData.last_hour_measurement.values.pm25
                )}
                limit="25"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PollutionSideCard.propTypes = {
  chosenCityData: PropTypes.object,
  getChosenCity: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  chosenCityData: selectMapChosenCityData
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(PollutionSideCard);
