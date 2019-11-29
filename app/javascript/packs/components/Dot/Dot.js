import React from "react";
import "./Dot.scss";
import { PropTypes } from "prop-types";

const Dot = ({ className, backgroundColor }) => (
  <div
    className={`dot ${className}`}
    style={{ backgroundColor: `${backgroundColor}` }}
  />
);

Dot.propTypes = {
  className: PropTypes.string,
  backgroundColor: PropTypes.string
};

export default Dot;
