import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Select, { components } from "react-select";

import { setChosenCity } from "../../redux/searchbox/searchbox.actions";
import { selectCitiesPollutionDataList } from "../../redux/redux.selectors";

import "./Searchbox.scss";
import { createStructuredSelector } from "reselect";

export const Searchbox = ({ cities, setChosenCity }) => {
  const options = cities.map(city => ({ value: city, label: city }));

  const [selectedValue, setSelectedValue] = useState("");

  const onChange = (option, actionMeta) => {
    switch (actionMeta.action) {
      case "select-option":
        setChosenCity(option.value);
        setSelectedValue("");
        return;
      default:
        return;
    }
  };

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    );
  };

  return (
    <div className="searchbox">
      <Select
        options={options}
        placeholder="Twoja miejscowość, lokalizacja..."
        noOptionsMessage={() => "Brak wybranej miejscowości"}
        onChange={onChange}
        className="react-select-container"
        classNamePrefix="react-select"
        components={{ DropdownIndicator }}
        value={selectedValue}
      />
    </div>
  );
};

Searchbox.propTypes = {
  cities: PropTypes.array,
  setChosenCity: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  cities: selectCitiesPollutionDataList
});

const mapDispatchToProps = dispatch => ({
  setChosenCity: chosenCity => dispatch(setChosenCity(chosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(Searchbox);
