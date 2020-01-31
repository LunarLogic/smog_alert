import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { createStructuredSelector } from "reselect";

import {
  PollutionCard,
  PollutionScale,
  Recommendation,
  TownImage
} from "../../components";
import {
  selectLocation,
  selectAdvice,
  selectChosenCityData
} from "../../redux/redux.selectors";

import "./CurrentPollutionSection.scss";
import { neutralColor } from "../../styles/_variables.scss";
import { setCloudColor } from "../../helpers";

const CurrentPollutionSection = ({ location, advice, chosenCityData }) => {
  return chosenCityData ? (
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
          <div className="current-pollution__recommendation-single">
            <Recommendation text={advice ? advice : "Brak rekomendacji"} />
          </div>
        </div>
        <div className="current-pollution__content-image">
          <TownImage
            color={
              chosenCityData.last_hour_measurement
                ? setCloudColor(chosenCityData.last_hour_measurement.status)
                : neutralColor
            }
          />
        </div>
      </div>
    </div>
  ) : (
    "loading"
  );
};

const mapStateToProps = createStructuredSelector({
  location: selectLocation,
  advice: selectAdvice,
  chosenCityData: selectChosenCityData
});

CurrentPollutionSection.propTypes = {
  location: PropTypes.string,
  advice: PropTypes.string,
  chosenCityData: PropTypes.object
};

export default connect(mapStateToProps)(CurrentPollutionSection);
