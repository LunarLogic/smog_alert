import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { createStructuredSelector } from "reselect";

import {
  PollutionCard,
  PollutionScale,
  IconRecommended
} from "../../components";
import { selectLocation, selectAdvice } from "../../redux/redux.selectors";
import Town from "../../assets/Town.png";

import "./CurrentPollutionSection.scss";

const CurrentPollutionSection = ({ location, advice }) => {
  return (
    <div className="current-pollution">
      <div className="current-pollution__heading">
        Aktualna jakość powietrza w miejscowości
        <br />
        <span className="current-pollution__heading--bold">{location}</span>
      </div>
      <div className="current-pollution__content">
        <div className="current-pollution__content-container">
          <PollutionCard />
          <PollutionScale />
          <div className="current-pollution__content-information">
            <div className="current-pollution__content-information-icon">
              <InfoOutlinedIcon />
            </div>
            <div className="current-pollution__content-information-question">
              Co to znaczy?
            </div>
          </div>
          <hr className="current-pollution__horizontal-line" />
          {/* <div className="current-pollution__recommendations-text">
            Zalecenia
          </div> */}
          {/* <div className="current-pollution__recommendations-icons">
            {iconData.map(icon => (
              <Icon key={icon} iconId={icon} />
            ))}
          </div> */}
          <div className="current-pollution__recommendation-single">
            <IconRecommended text={advice} />
          </div>
        </div>
        <div className="current-pollution__content-image">
          <img src={Town} alt="town view" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  location: selectLocation,
  advice: selectAdvice
});

CurrentPollutionSection.propTypes = {
  location: PropTypes.string,
  advice: PropTypes.string
};

export default connect(mapStateToProps)(CurrentPollutionSection);
