import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";

import { setChosenCity } from "../../redux/searchbox/searchbox.actions";

import "./Searchbox.scss";
import { Input } from "./Searchbox.styles.jsx";
import { grey, warning } from "../../styles/_variables";

const Searchbox = ({ cities, setChosenCity }) => {
  const greyColor = grey;
  const warningColor = warning;
  const [textColor, setTextColor] = useState(greyColor);
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");

  const escapeRegexCharacters = str =>
    str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const getSuggestions = value => {
    if (!value) {
      setTextColor(greyColor);
    }
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex = new RegExp("^" + escapedValue, "i");
    const filteredCities = cities.filter(city => regex.test(city));
    if (!filteredCities.length) {
      setTextColor(warningColor);
    }

    return filteredCities;
  };

  const getSuggestionValue = suggestion => suggestion;

  const onSuggestionSelected = (event, { suggestionValue }) => {
    setChosenCity(suggestionValue);
  };

  const shouldRenderSuggestions = () => true;

  const renderSuggestion = suggestion => (
    <div className="searchbox__list--city">{suggestion}</div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Twoja miejscowość, lokalizacja...",
    value,
    onChange: onChange
  };

  const renderInput = inputProps => (
    <div className="searchbox__input">
      <div className="searchbox__input--icon">
        <SearchIcon />
      </div>
      <Input
        placeholder="Twoja miejscowość, lokalizacja..."
        type="text"
        textColor={textColor}
        {...inputProps}
      ></Input>
    </div>
  );

  return (
    <div className="searchbox">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        onSuggestionSelected={onSuggestionSelected}
        shouldRenderSuggestions={shouldRenderSuggestions}
        renderSuggestion={renderSuggestion}
        renderInputComponent={renderInput}
        inputProps={inputProps}
      />
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
