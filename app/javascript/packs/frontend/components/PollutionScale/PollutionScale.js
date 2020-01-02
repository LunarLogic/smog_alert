import React from "react";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import PollutionScaleContent from "./PollutionScaleContent";
import { selectChosenCityData } from "../../redux/redux.selectors";
import { setColor } from "../../helpers/setColor";
import { setIndicator } from "../../helpers/setIndicator";

import "./PollutionScale.scss";
import { Indicator } from "./PollutionScale.styles.jsx";

const PollutionScale = ({ chosenCityData }) => {
  const { colorBox, description } = PollutionScaleContent;

  let color;
  let indicator;
  let shouldRender = chosenCityData;

  if (shouldRender) {
    const status = chosenCityData.last_hour_measurement.status;
    color = setColor(status);
    indicator = setIndicator(status);
  }

  return shouldRender ? (
    <div className="scale__container">
      <Indicator color={color} indicator={indicator} />
      <div className="scale__container-ranges">
        {colorBox.map(box => (
          <div key={box} className={`scale__color-background--${box}`}></div>
        ))}
      </div>
      <div className="scale__container-legend">
        {description.map(desc => (
          <div key={desc} className="scale__container-legend-item">
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
