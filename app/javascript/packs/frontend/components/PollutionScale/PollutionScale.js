import React from "react";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import uuid from "uuid";

import PollutionScaleContent from "./PollutionScaleContent";
import { selectChosenCityData } from "../../redux/redux.selectors";
import { setColor } from "../../helpers/setColor";
import { setIndicator } from "../../helpers/setIndicator";

import "./PollutionScale.scss";
import { Indicator } from "./PollutionScale.styles.jsx";

export const PollutionScale = ({ chosenCityData }) => {
  const { colorBox, description } = PollutionScaleContent;
  let color;
  let indicator;
  let opacity = 1;

  if (chosenCityData) {
    var { last_hour_measurement } = chosenCityData;
    color = setColor(last_hour_measurement);
    indicator = setIndicator(last_hour_measurement);
    if (!last_hour_measurement) {
      opacity = 0;
    }
  }

  return chosenCityData ? (
    <div className="scale__container">
      <Indicator color={color} indicator={indicator} opacity={opacity} />
      <div className="scale__container-ranges">
        {colorBox.map(box => (
          <div key={box} className={`scale__color-background--${box}`}></div>
        ))}
      </div>
      <div className="scale__container-legend">
        {description.map(desc => (
          <div key={uuid.v4()} className="scale__container-legend-item">
            {desc}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="scale__container" />
  );
};

const mapStateToProps = createStructuredSelector({
  chosenCityData: selectChosenCityData
});

PollutionScale.propTypes = {
  chosenCityData: PropTypes.object
};

export default connect(mapStateToProps)(PollutionScale);
