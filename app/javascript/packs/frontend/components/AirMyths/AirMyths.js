import React from "react";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
// import CloseIcon from "@material-ui/icons/Close";
// import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import airMythsContent from "./AirMyths.json";

import "./AirMyths.scss";

const AirMyths = () => {
  const createAirMyth = airMythsContent.data.map((myth, index) => {
    return (
      <div className="air-myths__single-myth" key={`${index}-myth`}>
        <div className="air-myths__single-myth--counter">MIT #{index + 1}:</div>
        <div className="air-myths__single-myth--container">
          <div className="air-myths__single-myth--container-quotation-marks">
            <FormatQuoteIcon />
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
