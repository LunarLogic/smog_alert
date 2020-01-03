import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import data from "../../pages/Homepage/data";

import "./DropdownMenu.scss";
import { PropTypes } from "prop-types";

const DropdownMenu = ({ value }) => {
  const options = data.map(cityData => ({
    value: cityData.location,
    label: cityData.location,
    className: "dropdown__control--menu-option"
  }));

  return (
    <Dropdown
      options={options}
      value={value}
      className="dropdown"
      controlClassName="dropdown__control"
      placeholderClassName="dropdown__control--placeholder"
      menuClassName="dropdown__control--menu"
      arrowClosed={<ExpandMoreIcon />}
      arrowOpen={<ExpandLessIcon />}
      // onChange={}
    />
  );
};

DropdownMenu.propTypes = {
  value: PropTypes.string
};

export default DropdownMenu;
