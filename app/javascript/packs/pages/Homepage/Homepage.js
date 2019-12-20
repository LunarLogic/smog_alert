import React from "react";

import { CurrentPollutionSection, MapSection } from "../../sections";
import { Searchbox } from "../../components";
import data from "./data";

import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="homepage">
      <Searchbox cities={data.map(item => item.location)} data={data} />
      <CurrentPollutionSection />
      <hr className="homepage__horizontal-line" />
      <MapSection />
    </div>
  );
};

export default Homepage;
