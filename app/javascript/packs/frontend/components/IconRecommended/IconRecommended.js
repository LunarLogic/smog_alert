import React from "react";
import { PropTypes } from "prop-types";

import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

import "./IconRecommended.scss";

const IconRecommended = ({ text }) => {
  return (
    <div className="icon-recommended">
      <div className={`icon-recommended__content icon__content--recommended`}>
        <PriorityHighIcon
          style={{ fontSize: 26 }}
          color={"inherit"}
        ></PriorityHighIcon>
      </div>
      <div className="icon-recommended__text">{text}</div>
    </div>
  );
};

IconRecommended.propTypes = {
  text: PropTypes.string
};

export default IconRecommended;
