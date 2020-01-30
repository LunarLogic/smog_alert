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

export const DropdownMenu = ({
  citiesPollutionData,
  chosenCity,
  getChosenCity
}) => {
  let options = [];

  const checkOptions = city => {
    return (
      options.length === 0 ||
      !options.find(element => element === city.location_name)
    );
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setArrow(!arrowUp);
  };

  const changeChosenCity = city => {
    setShowMenu(false);
    getChosenCity(city);
  };

  citiesPollutionData.forEach(city => {
    if (checkOptions(city)) {
      options.push(city.location_name);
    }
  });

  options.sort((a, b) => a.localeCompare(b));

  const [showMenu, setShowMenu] = useState(false);
  const [arrowUp, setArrow] = useState(false);

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
              className="dropdown__control--menu-option"
              key={`${city}-dropdown`}
              onClick={() => {
                changeChosenCity(city);
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
