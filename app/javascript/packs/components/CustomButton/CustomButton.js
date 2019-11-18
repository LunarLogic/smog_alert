import React from "react";
import "./CustomButton.scss";
import { PropTypes } from "prop-types";

const CustomButton = ({ text }) => {
  return <div className="custom-button">{text}</div>;
};

CustomButton.propTypes = {
  text: PropTypes.string
};

export default CustomButton;
