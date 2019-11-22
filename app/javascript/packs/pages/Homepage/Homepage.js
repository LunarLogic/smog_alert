import React from "react";
import "./Homepage.scss";
import Searchbox from "../../components/Searchbox/Searchbox";
import CurrentPollution from "../../components/sections/CurrentPollution/CurrentPollution";

const Homepage = () => {
  return (
    <div className="homepage">
      <Searchbox />
      <CurrentPollution />
    </div>
  );
};

export default Homepage;
