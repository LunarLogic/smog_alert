import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import uuid from "uuid";

import "./DropdownMenu.scss";
import {
  selectMapLocation,
  selectCitiesPollutionData
} from "../../redux/redux.selectors";
import { getChosenCity } from "../../redux/mapSection/mapSection.actions";

const DropdownMenu = ({ citiesPollutionData, chosenCity, getChosenCity }) => {
  let options = [];

  citiesPollutionData.forEach(city => {
    if (options.length === 0) {
      options.push({
        value: city.location_name,
        className: "dropdown__control--menu-option"
      });
    } else if (!options.find(element => element.value === city.location_name)) {
      options.push({
        value: city.location_name,
        className: "dropdown__control--menu-option"
      });
    }
  });

  options.sort((a, b) => b.value < a.value);

  const [showMenu, setShowMenu] = useState(false);
  const [arrowUp, setArrow] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setArrow(!arrowUp);
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
              key={uuid.v4()}
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
