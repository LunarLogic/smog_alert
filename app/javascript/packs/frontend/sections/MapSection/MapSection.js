import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Element } from "react-scroll";

import { PollutionComparison, Map } from "../../components";
import { PollutionSideCard } from "../../components";

import "./MapSection.scss";
import { createStructuredSelector } from "reselect";
import { selectMapLocation } from "../../redux/redux.selectors";

export const MapSection = ({ chosenCity }) => {
  return (
    <Element className="map-section" name="map-section">
      <div className="map-section__heading">
        Jakość powietrza w gminie Zabierzów
      </div>
      <div className="map-section__subheading">
        Porównanie zanieczyszczenia powietrza w gminie Zabierzów i okolicy
      </div>
      <div className="map-section__content">
        <div className="map-section__content--map">
          <Map />
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
  chosenCity: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  chosenCity: selectMapLocation
});

export default connect(mapStateToProps)(MapSection);
