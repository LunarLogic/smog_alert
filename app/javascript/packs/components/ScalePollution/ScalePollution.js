import React from "react";
import "./ScalePollution.scss";
import scalePollutionContent from "./scalePollutionContent";
import { Indicator } from "./ScalePollution.styles.jsx";

const ScalePollution = ({ color, indicator }) => {
  const { colorBox, description } = scalePollutionContent;
  return (
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
  );
};

export default ScalePollution;
