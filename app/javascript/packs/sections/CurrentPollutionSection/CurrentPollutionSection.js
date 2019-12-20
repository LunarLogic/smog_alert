import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import { CardPollution, ScalePollution, Icon } from "../../components";
import Town from "../../../../assets/images/Town.png";

import "./CurrentPollutionSection.scss";

const CurrentPollutionSection = ({ location_name }) => {
  const iconData = ["id1", "id2", "id3", "id4"];

  return (
    <div className="current-pollution">
      <div className="current-pollution__heading">
        Aktualna jakość powietrza w miejscowości{" "}
        <span className="current-pollution__heading--bold">
          {location_name}
        </span>
      </div>
      <div className="current-pollution__content">
        <div>
          <CardPollution location={location_name} />
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

const mapStateToProps = ({ searchbox: { location_name } }) => ({
  location_name
});

CurrentPollutionSection.propTypes = {
  location_name: PropTypes.string,
  citiesPollutionData: PropTypes.array
};

export default connect(mapStateToProps)(CurrentPollutionSection);
