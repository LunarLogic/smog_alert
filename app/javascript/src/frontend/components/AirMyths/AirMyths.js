import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import airMythsContent from "./AirMyths.json";

import "./AirMyths.scss";

const AirMyths = () => {
  const createAirMyth = airMythsContent.data.map((myth, index) => {
    return (
      <div className="air-myths__single-myth" key={`${index}-myth`}>
        <div className="air-myths__single-myth--counter">MIT #{index + 1}:</div>
        <div className="air-myths__single-myth--container">
          <div className="air-myths__single-myth--container-icon">
            <CloseIcon />
          </div>
          <div className="air-myths__single-myth--container-content">
            <h1 className="air-myths__single-myth--container-content-title">
              {myth.title}
            </h1>
            <div className="air-myths__single-myth--container-content-text">
              {myth.text}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="air-myths">
      <div className="air-myths__heading">Obalamy mity</div>
      <div className="air-myths__subheading">
        Poznaj fakty dotyczące smogu i zidentyfikuj mity o zanieczyszczeniu
        powietrza.
      </div>
      {createAirMyth}
    </div>
  );
};

export default AirMyths;
