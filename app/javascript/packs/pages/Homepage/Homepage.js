import React from "react";
import "./Homepage.scss";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Searchbox from "../../components/Searchbox/Searchbox";
import CardPollution from "../../components/CardPollution/CardPollution";
import Town from "../../../../assets/images/Town.png";
import ScalePollution from "../../components/ScalePollution/ScalePollution";
import Icon from "../../components/Icon/Icon";

const Homepage = () => {
  const iconData = ["id1", "id2", "id3", "id4"];

  return (
    <div className="homepage">
      <Searchbox />
      <div className="homepage__heading">
        Aktualna jakość powietrza w miejscowości{" "}
        <span className="homepage__heading--bold">Zabierzów</span>
      </div>
      <div className="homepage__content">
        <div>
          <CardPollution />
          <ScalePollution />
          <div className="homepage__content-information">
            <div className="homepage__content-information-icon">
              <InfoOutlinedIcon />
            </div>
            <div className="homepage__content-information-question">
              Co to znaczy?
            </div>
          </div>
          <hr className="homepage__horizontal-line" />
          <div className="homepage__recommendations-text">Zalecenia</div>
          <div className="homepage__recommendations-icons">
            {iconData.map(icon => (
              <Icon key={icon} iconId={icon} />
            ))}
          </div>
        </div>
        <div className="homepage__content-image">
          <img src={Town} alt="town view" />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
