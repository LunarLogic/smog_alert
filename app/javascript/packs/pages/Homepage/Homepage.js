import React from "react";
import "./Homepage.scss";
import CurrentPollution from "../../sections/CurrentPollution/CurrentPollution";
import MapSection from "../../sections/Map/MapSection";
import Searchbox from "../../components/Searchbox/Searchbox";

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
