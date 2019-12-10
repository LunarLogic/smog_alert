import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Searchbox.scss";
import { PropTypes } from "prop-types";
import { getCityPollutionData } from "../../redux/searchbox/searchbox.actions";
import { connect } from "react-redux";

const Searchbox = ({ cities, data, getCityPollutionData }) => {
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState("hidden");

  const handleChange = event => {
    const { value } = event.target;
    setLocation(value);

    const elementClass = value ? "visible" : "hidden";
    setVisibility(elementClass);
  };

  const handleInput = city => {
    setLocation(city);

    const chosenCity = data.filter(item => item.location === city)[0];
    console.log(chosenCity);
    getCityPollutionData(chosenCity);
    setVisibility("hidden");
  };

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="searchbox">
      <div className="searchbox__input">
        <div className="searchbox__input--icon">
          <SearchIcon />
        </div>
        <input
          className="searchbox__input--text-field"
          placeholder="Twoja miejscowość, lokalizacja..."
          onChange={handleChange}
          value={location}
          type="text"
        ></input>
      </div>
      <div className={`searchbox__list ${visibility}`}>
        {filteredCities.map(city => (
          <div
            key={`option-${city}`}
            className="searchbox__list--city"
            onClick={() => {
              handleInput(city);
            }}
          >
            {city}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getCityPollutionData: cityPollutionData =>
    dispatch(getCityPollutionData(cityPollutionData))
});

Searchbox.proptypes = {
  cities: PropTypes.array
};

export default connect(null, mapDispatchToProps)(Searchbox);
