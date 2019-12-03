import React from "react";
import "./Dot.scss";
import { PropTypes } from "prop-types";

const Dot = ({ id, className, backgroundColor, onClick }) => (
  <div
    id={id}
    className={`dot ${className}`}
    style={{ backgroundColor: `${backgroundColor}` }}
    onClick={onClick}
  />
);

Dot.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func
};

export default Dot;
