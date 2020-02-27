import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Element, Link as ScrollLink } from "react-scroll";

import { PollutionComparison, Map } from "../../components";
import { PollutionSideCard } from "../../components";

import "./MapSection.scss";
import { createStructuredSelector } from "reselect";
import { selectMapLocation } from "../../redux/redux.selectors";
import { getChosenCity } from "../../redux/mapSection/mapSection.actions";

export const MapSection = ({ chosenCity, getChosenCity }) => {
  useEffect(() => {
    getChosenCity("");
  }, []);

  return (
    <Element className="map-section" name="map-section" id="map-section">
      <div className="map-section__heading">
        Jakość powietrza w gminie Zabierzów
      </div>
      <div className="map-section__subheading">
        Porównanie zanieczyszczenia powietrza w gminie Zabierzów i okolicy
      </div>
      <div className="map-section__content">
        <div className="map-section__content--map">
          <ScrollLink
            to="map-section__content--info"
            smooth={true}
            duration={500}
            offset={-100}
          >
            <Map />
          </ScrollLink>
        </div>
        <Element
          className="map-section__content--info"
          name="map-section__content--info"
        >
          {chosenCity ? (
            <PollutionSideCard locationName={chosenCity} />
          ) : (
            <PollutionComparison />
          )}
        </Element>
      </div>
    </Element>
  );
};

MapSection.propTypes = {
  chosenCity: PropTypes.string,
  getChosenCity: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  chosenCity: selectMapLocation
});

const mapDispatchToProps = dispatch => ({
  getChosenCity: chosenCity => dispatch(getChosenCity(chosenCity))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapSection);
