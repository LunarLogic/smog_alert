import React from "react";
import "./SidePollutionCard.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

const SidePollutionCard = () => {
  return (
    <div className="side-pollution-card">
      <div className="side-pollution-card__return-button">
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
        <div className="side-pollution-card__content--air-quality"></div>
        <div className="side-pollution-card__content--air-quality-label">
          Aktualna jakość powietrza
        </div>
        <div className="side-pollution-card__content--air-quality-overview">
          <div className="side-pollution-card__content--air-quality-overview-face"></div>
          <div className="side-pollution-card__content--air-quality-overview-text"></div>
        </div>
        <div className="side-pollution-card__content--air-quality-values"></div>
      </div>
    </div>
  );
};

export default SidePollutionCard;
