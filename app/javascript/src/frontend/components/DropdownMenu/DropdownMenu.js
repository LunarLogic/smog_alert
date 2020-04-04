import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { PropTypes } from "prop-types";

import "./DropdownMenu.scss";

export const DropdownMenu = ({
  optionsList,
  chosenCityToBeDisplayed,
  handleChosenCity
}) => {
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setArrow(!arrowUp);
  };

  const changeChosenCity = city => {
    setShowMenu(false);
    handleChosenCity(city);
  };

  const options = optionsList.sort((a, b) => a.localeCompare(b));

  const [showMenu, setShowMenu] = useState(false);
  const [arrowUp, setArrow] = useState(false);

  return (
    <div className="dropdown">
      <div
        className="dropdown__control"
        onClick={toggleMenu}
        // onBlur={toggleMenu}
        tabIndex="0"
      >
        <div className="dropdown__control--placeholder">
          {chosenCityToBeDisplayed}
        </div>
        {arrowUp ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      {showMenu ? (
        <div id="menu" className="dropdown__control--menu">
          {options.map(city => (
            <div
              className="dropdown__control--menu-option"
              key={`${city}-dropdown`}
              onClick={() => {
                changeChosenCity(city);
                toggleMenu();
              }}
            >
              {city}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

DropdownMenu.propTypes = {
  chosenCityToBeDisplayed: PropTypes.string,
  handleChosenCity: PropTypes.func,
  optionsList: PropTypes.array
};

export default DropdownMenu;
