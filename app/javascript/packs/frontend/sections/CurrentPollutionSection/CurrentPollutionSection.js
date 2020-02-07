import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { createStructuredSelector } from "reselect";
import { setPopUpStatus } from "../../redux/homepage/homepage.actions";

import {
  PollutionCard,
  PollutionScale,
  Recommendation,
  TownImage,
  PopUp
} from "../../components";
import {
  selectLocation,
  selectAdvice,
  selectChosenCityData,
  selectPopUpStatus
} from "../../redux/redux.selectors";

import "./CurrentPollutionSection.scss";
import { neutralColor } from "../../styles/_variables.scss";
import { setCloudColor } from "../../helpers";

const CurrentPollutionSection = ({
  location,
  advice,
  chosenCityData,
  popUpOpen,
  setPopUpStatus
}) => {
  const togglePopUp = () => {
    setPopUpStatus(!popUpOpen);
  };

  return chosenCityData ? (
    <div className="current-pollution">
      <div className="current-pollution__heading">
        Aktualna jakość powietrza w miejscowości
        <br />
        <span className="current-pollution__heading--bold">{location}</span>
      </div>
      <div className="current-pollution__content">
        <div className="current-pollution__content-container">
          {popUpOpen ? <PopUp /> : null}
          <PollutionCard />
          <PollutionScale />
          <div className="current-pollution__content-information">
            <div className="current-pollution__content-information-icon">
              <InfoOutlinedIcon />
            </div>
            <div
              className="current-pollution__content-information-question"
              onClick={togglePopUp}
            >
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
  chosenCityData: selectChosenCityData,
  popUpOpen: selectPopUpStatus
});

const mapDispatchToProps = dispatch => ({
  setPopUpStatus: popUpOpen => dispatch(setPopUpStatus(popUpOpen))
});

CurrentPollutionSection.propTypes = {
  location: PropTypes.string,
  advice: PropTypes.string,
  chosenCityData: PropTypes.object,
  popUpOpen: PropTypes.bool,
  setPopUpStatus: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPollutionSection);
