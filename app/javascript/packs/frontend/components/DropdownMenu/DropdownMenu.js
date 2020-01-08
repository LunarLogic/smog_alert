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

const DropdownMenu = ({ citiesPollutionData, chosenCity, getChosenCity }) => {
  const options = citiesPollutionData.map(cityData => ({
    value: cityData.location_name,
    label: cityData.location_name,
    className: "dropdown__control--menu-option"
  }));

  const [showMenu, setShowMenu] = useState(false);
  const [arrowUp, setArrow] = useState(false);

  const toggleMenu = () => {
    showMenu === false ? setShowMenu(true) : setShowMenu(false);
    arrowUp === false ? setArrow(true) : setArrow(false);
  };

  const changeChosenCity = () => {
    let city = event.target.textContent;
    setShowMenu(false);
    getChosenCity(city);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__control" onClick={toggleMenu}>
        <div className="dropdown__control--placeholder">{chosenCity}</div>
        {arrowUp ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      {showMenu ? (
        <div id="menu" className="dropdown__control--menu">
          {options.map(city => (
            <div
              className={city.className}
              key={city.value}
              onClick={changeChosenCity}
            >
              {city.value}
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
