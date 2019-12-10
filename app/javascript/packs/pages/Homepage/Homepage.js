import React from "react";
import "./Homepage.scss";
import CurrentPollutionSection from "../../sections/CurrentPollutionSection/CurrentPollutionSection";
import MapSection from "../../sections/MapSection/MapSection";
import Searchbox from "../../components/Searchbox/Searchbox";
import data from "./data";

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
