import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Searchbox.scss";
import { PropTypes } from "prop-types";

const Searchbox = ({ cities }) => {
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState("hidden");

  const handleChange = event => {
    const { value } = event.target;
    setLocation(value);

    let elementClass;
    if (value) {
      elementClass = "visible";
    } else {
      elementClass = "hidden";
    }
    // const { elementClass } = value ? "visible" : console.log("tak");
    setVisibility(elementClass);
  };

  const handleInput = city => {
    setLocation(city);
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

Searchbox.proptypes = {
  cities: PropTypes.array
};

export default Searchbox;
