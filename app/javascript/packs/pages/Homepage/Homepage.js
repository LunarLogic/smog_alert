import React from "react";
import "./Homepage.scss";
import Searchbox from "../../components/Searchbox/Searchbox";
import CardPollution from "../../components/CardPollution/CardPollution";
import Town from "../../../../assets/images/Town.png";

const Homepage = () => {
  return (
    <div className="homepage">
      <Searchbox />
      <div className="homepage__heading">
        Aktualna jakość powietrza w miejscowości{" "}
        <span className="homepage__heading--bold">Zabierzów</span>
      </div>
      <div className="homepage__content">
        <CardPollution />
        <div className="homepage__content-image">
          <img src={Town} alt="town view" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
