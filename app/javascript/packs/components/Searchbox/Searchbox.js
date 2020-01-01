import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { setChosenCity } from "../../redux/searchbox/searchbox.actions";

import "./Searchbox.scss";
import { Input } from "./Searchbox.styles.jsx";
import { grey, warning } from "../../styles/_variables";

const Searchbox = ({ cities, setChosenCity }) => {
  const greyColor = grey;
  const warningColor = warning;
  const [location, setLocation] = useState("");
  const [textColor, setTextColor] = useState(greyColor);
  const [filteredCities, setFilteredCities] = useState([]);

  const handleSearchboxList = () => {
    if (!location.length) {
      setFilteredCities([]);
      return;
    }

    const filterCities = cities.filter(city =>
      city.toLowerCase().includes(location.toLowerCase())
    );
    setFilteredCities(filterCities);
    filterCities.length ? setTextColor(greyColor) : setTextColor(warningColor);
  };

  useEffect(handleSearchboxList, [location]);

  const handleChange = event => {
    const { value } = event.target;
    setLocation(value);
    if (!value.length) {
      setTextColor(greyColor);
    }
  };

  const handleChosenCity = city => {
    setLocation("");

    const chosenCity = cities.filter(item => item === city)[0];
    console.log(chosenCity);
    setChosenCity(chosenCity);
  };

  return (
    <div className="searchbox">
      <div className="searchbox__input">
        <div className="searchbox__input--icon">
          <SearchIcon />
        </div>
        <Input
          placeholder="Twoja miejscowość, lokalizacja..."
          onChange={handleChange}
          value={location}
          type="text"
          textColor={textColor}
        ></Input>
      </div>
      {filteredCities.length > 0 && (
        <div className="searchbox__list">
          {filteredCities.map(city => (
            <div
              key={`option-${city}`}
              className="searchbox__list--city"
              onClick={() => {
                handleChosenCity(city);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
      {textColor === warningColor ? (
        <div className="searchbox__warning">Brak wybranej miejscowości</div>
      ) : null}
    </div>
  );
};

Searchbox.propTypes = {
  cities: PropTypes.array,
  setChosenCity: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setChosenCity: chosenCity => dispatch(setChosenCity(chosenCity))
});

export default connect(null, mapDispatchToProps)(Searchbox);
