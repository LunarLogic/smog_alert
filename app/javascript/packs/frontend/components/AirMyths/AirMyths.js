import React from "react";
import airMythsContent from "./AirMyths.json";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";

import "./AirMyths.scss";

const AirMyths = () => {
  const createAirMyth = airMythsContent.data.map(myth => {
    return (
      <div className="air-myths__content" key={myth.title}>
        <div className="air-myths__content-title">
          <FormatQuoteIcon />
          {myth.title}
          <FormatQuoteIcon />
        </div>
        <div className="air-myths__content-text">{myth.text}</div>
      </div>
    );
  });

  return (
    <div className="air-myths">
      <div className="air-myths__heading">Obalamy mity</div>
      {createAirMyth}
    </div>
  );
};

export default AirMyths;
