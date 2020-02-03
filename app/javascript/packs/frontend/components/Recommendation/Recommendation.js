import React from "react";
import { PropTypes } from "prop-types";

import PriorityHighIcon from "@material-ui/icons/PriorityHigh";

import "./Recommendation.scss";

const Recommendation = ({ text }) => {
  return (
    <div className="recommendation">
      <div className="recommendation__content icon__content--recommended">
        <PriorityHighIcon
          style={{ fontSize: 20 }}
          color="inherit"
        ></PriorityHighIcon>
      </div>
      <div className="recommendation__text">{text}</div>
    </div>
  );
};

Recommendation.propTypes = {
  text: PropTypes.string
};

export default Recommendation;
