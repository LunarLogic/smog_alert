import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const Searchbox = () => {
  return (
    <div className="searchbox">
      <div className="searchbox__icon">
        <SearchIcon />
      </div>
      <input className="searchbox__input"></input>
    </div>
  );
};

export default Searchbox;
