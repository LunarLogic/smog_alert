import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import "./DropdownMenu.scss";
import {
  selectMapLocation,
  selectCitiesPollutionData
} from "../../redux/redux.selectors";
import { getChosenCity } from "../../redux/mapSection/mapSection.actions";

export const dropdownMenuHelpers = {
  options: [],
  checkOptions: city => {
    return (
      dropdownMenuHelpers.options.length === 0 ||
      !dropdownMenuHelpers.options.find(
        element => element === city.location_name
      )
    );
  },
  toggleMenu: (setShowMenu, showMenu, setArrow, arrowUp) => {
    setShowMenu(!showMenu);
    setArrow(!arrowUp);
  },
  changeChosenCity: (city, setShowMenu, getChosenCity) => {
    setShowMenu(false);
    getChosenCity(city);
  },
  sortOptions: options => {
    return options.sort((a, b) => b.value < a.value);
  }
};

export const DropdownMenu = ({
  citiesPollutionData,
  chosenCity,
  getChosenCity
}) => {
  const {
    options,
    checkOptions,
    toggleMenu,
    changeChosenCity,
    sortOptions
  } = dropdownMenuHelpers;

  citiesPollutionData.forEach(city => {
    if (checkOptions(city)) {
      options.push(city.location_name);
    }
  });

  sortOptions(options);

  const [showMenu, setShowMenu] = useState(false);
  const [arrowUp, setArrow] = useState(false);

  return (
    <div className="dropdown">
      <div
        className="dropdown__control"
        onClick={() => {
          toggleMenu(setShowMenu, showMenu, setArrow, arrowUp);
        }}
      >
        <div className="dropdown__control--placeholder">{chosenCity}</div>
        {arrowUp ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      {showMenu ? (
        <div id="menu" className="dropdown__control--menu">
          {options.map(city => (
            <div
              className="dropdown__control--menu-option"
              key={`${city}-dropdown`}
              onClick={() => {
                changeChosenCity(city, setShowMenu, getChosenCity);
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
  chosenCity: PropTypes.string,
  getChosenCity: PropTypes.func,
  citiesPollutionData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  chosenCity: selectMapLocation,
  citiesPollutionData: selectCitiesPollutionData
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
