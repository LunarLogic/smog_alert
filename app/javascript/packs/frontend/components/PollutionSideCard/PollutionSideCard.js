import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";

import { PollutionIndexData, DropdownMenu } from "..";
import { setPercent, setColor, setLimit } from "../../helpers";

import "./PollutionSideCard.scss";
import {
  PollutionOverviewFace,
  PollutionOverviewText
} from "./PollutionSideCard.styles.jsx";

import { getChosenCity } from "../../redux/mapSection/mapSection.actions";
import { selectMapChosenCityData } from "../../redux/redux.selectors";

const PollutionSideCard = ({ chosenCityData, getChosenCity }) => {
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
          const color = setColor(data.last_hour_measurement.status);
          return (
            <div
              className="side-pollution-card__content--air-quality"
              key={data.location_display_name}
            >
              <div className="side-pollution-card__content--air-quality-label">
                Aktualna jakość powietrza dla lokalizacji{" "}
                <span className="side-pollution-card__content--air-quality-label-bold">
                  {data.location_display_name}
                </span>
              </div>
              <div className="side-pollution-card__content--air-quality-info">
                <div className="side-pollution-card__content--air-quality-info-overview">
                  <PollutionOverviewFace color={color} />
                  <PollutionOverviewText color={color}>
                    {data.last_hour_measurement.status}
                  </PollutionOverviewText>
                </div>
                <div className="side-pollution-card__content--air-quality-info-specific">
                  {data.last_hour_measurement.values.map(data => {
                    return (
                      <PollutionIndexData
                        key={data.name}
                        indicator={data.name}
                        value={data.value}
                        percent={setPercent(data.name, data.value)}
                        limit={setLimit(data.name)}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
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
