import React from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import data from "../../pages/Homepage/data";

import "./DropdownMenu.scss";
import { selectMapLocation } from "../../redux/redux.selectors";
import { getChosenCity } from "../../redux/mapSection/mapSection.actions";

const DropdownMenu = ({ chosenCity, getChosenCity }) => {
  const options = data.map(cityData => ({
    value: cityData.location,
    label: cityData.location,
    className: "dropdown__control--menu-option"
  }));

  // Below function along with onChange attribute on Dropdown will be changed, but it's working, so I left it for now
  const changeChosenCity = () => {
    let city = document.querySelector(
      ".Dropdown-placeholder.dropdown__control--placeholder.is-selected"
    ).textContent;
    getChosenCity(city);
  };

  return (
    <Dropdown
      options={options}
      value={chosenCity}
      className="dropdown"
      controlClassName="dropdown__control"
      placeholderClassName="dropdown__control--placeholder"
      menuClassName="dropdown__control--menu"
      arrowClosed={<ExpandMoreIcon />}
      arrowOpen={<ExpandLessIcon />}
      onChange={() => {
        setTimeout(changeChosenCity, 10);
      }}
    />
  );
};

DropdownMenu.propTypes = {
  chosenCity: PropTypes.string,
  getChosenCity: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  chosenCity: selectMapLocation
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
