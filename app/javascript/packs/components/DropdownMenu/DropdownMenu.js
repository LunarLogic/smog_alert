import React from "react";
import "./DropdownMenu.scss";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import data from "../../pages/Homepage/data";

const DropdownMenu = () => {
  const options = data.map(cityData => ({
    value: cityData.location,
    label: cityData.location,
    className: "dropdown__control--menu-option"
  }));

  const defaultOption = options[0];

  return (
    <Dropdown
      options={options}
      value={defaultOption}
      className="dropdown"
      controlClassName="dropdown__control"
      placeholderClassName="dropdown__control--placeholder"
      menuClassName="dropdown__control--menu"
      arrowClosed={<ExpandMoreIcon />}
      arrowOpen={<ExpandLessIcon />}
    />
  );
};

export default DropdownMenu;
