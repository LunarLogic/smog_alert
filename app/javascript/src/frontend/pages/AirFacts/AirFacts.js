import React from "react";
import { AirMyths, PageTitle } from "../../components";

import "./AirFacts.scss";

const AirFacts = () => {
  return (
    <div className="air-facts">
      <PageTitle title="Czym Oddycham" />
      <AirMyths />
    </div>
  );
};

export default AirFacts;
