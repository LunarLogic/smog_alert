import React from "react";
import "./SidePollutionCard.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import PollutionIndexData from "../PollutionIndexData/PollutionIndexData";

const SidePollutionCard = () => {
  const pollutionIndexData = [
    {
      indicator: "PM 10",
      value: 56,
      percent: 112,
      limit: 50
    },
    {
      indicator: "PM 2.5",
      value: 27,
      percent: 108,
      limit: 25
    }
  ];

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
        <div className="side-pollution-card__content--air-quality">
          <div className="side-pollution-card__content--air-quality-label">
            Aktualna jakość powietrza
          </div>
          <div className="side-pollution-card__content--air-quality-info">
            <div className="side-pollution-card__content--air-quality-info-overview">
              <div className="side-pollution-card__content--air-quality-info-overview-face"></div>
              <div className="side-pollution-card__content--air-quality-info-overview-text">
                Niezdrowa
              </div>
            </div>
            <div className="side-pollution-card__content--air-quality-info-specific">
              {pollutionIndexData.map(indexData => {
                return (
                  <PollutionIndexData
                    key={indexData.indicator}
                    indicator={indexData.indicator}
                    value={indexData.value}
                    percent={indexData.percent}
                    limit={indexData.limit}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidePollutionCard;
