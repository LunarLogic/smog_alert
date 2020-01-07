import React from "react";
import { PropTypes } from "prop-types";

import "./CustomButton.scss";

const CustomButton = ({ text }) => {
  return <div className="custom-button">{text}</div>;
};

CustomButton.propTypes = {
  text: PropTypes.string
};

export default CustomButton;
