import React from "react";
import airMythsContent from "./AirMyths.json";

import "./AirMyths.scss";

const AirMyths = () => {
  const createAirMyth = airMythsContent.data.map((myth, index) => {
    return (
      <div className="air-myths__content" key={`${index}-myth`}>
        <div className="air-myths__content-title">{myth.title}</div>
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
