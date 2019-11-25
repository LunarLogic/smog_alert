import React from "react";
import CardPollution from "../../components/CardPollution/CardPollution";
import ScalePollution from "../../components/ScalePollution/ScalePollution";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Icon from "../../components/Icon/Icon";
import Town from "../../../../assets/images/Town.png";
import "./CurrentPollutionSection.scss";

const CurrentPollutionSection = () => {
  const iconData = ["id1", "id2", "id3", "id4"];

  return (
    <div className="current-pollution">
      <div className="current-pollution__heading">
        Aktualna jakość powietrza w miejscowości{" "}
        <span className="current-pollution__heading--bold">Zabierzów</span>
      </div>
      <div className="current-pollution__content">
        <div>
          <CardPollution />
          <ScalePollution />
          <div className="current-pollution__content-information">
            <div className="current-pollution__content-information-icon">
              <InfoOutlinedIcon />
            </div>
            <div className="current-pollution__content-information-question">
              Co to znaczy?
            </div>
          </div>
          <hr className="current-pollution__horizontal-line" />
          <div className="current-pollution__recommendations-text">
            Zalecenia
          </div>
          <div className="current-pollution__recommendations-icons">
            {iconData.map(icon => (
              <Icon key={icon} iconId={icon} />
            ))}
          </div>
        </div>
        <div className="current-pollution__content-image">
          <img src={Town} alt="town view" />
        </div>
      </div>
    </div>
  );
};

export default CurrentPollutionSection;
