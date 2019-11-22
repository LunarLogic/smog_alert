import React from "react";
import "./Icon.scss";
import iconContent from "./iconContent";
import { PropTypes } from "prop-types";

const Icon = ({ iconId }) => {
  const icon = iconContent[iconId];

  return (
    <div className="icon">
      <div className={`icon__content ${icon[1]}`}></div>
      <div className="icon__text">{icon[0]}</div>
    </div>
  );
};

Icon.propTypes = {
  iconId: PropTypes.string
};

export default Icon;
