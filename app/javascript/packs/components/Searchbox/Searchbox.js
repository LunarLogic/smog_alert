import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./Searchbox.scss";

const Searchbox = () => {
  const [location, setLocation] = useState("");

  const handleChange = event => {
    const { value } = event.target;

    setLocation(value);
  };
  return (
    <div className="searchbox">
      <div className="searchbox__icon">
        <SearchIcon />
      </div>
      <input
        className="searchbox__input"
        placeholder="Twoja miejscowość, lokalizacja..."
        onChange={handleChange}
        value={location}
        type="text"
      ></input>
    </div>
  );
};

export default Searchbox;
