import React from "react";
import "./Homepage.scss";
import Searchbox from "../../components/Searchbox/Searchbox";
import CurrentPollution from "../../components/sections/CurrentPollution/CurrentPollution";
import MapSection from "../../components/sections/Map/MapSection";

const Homepage = () => {
  return (
    <div className="homepage">
      <Searchbox />
      <CurrentPollution />
      <hr className="homepage__horizontal-line" />
      <MapSection />
    </div>
  );
};

export default Homepage;
