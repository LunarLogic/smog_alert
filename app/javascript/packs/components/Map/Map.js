import React, { useEffect } from "react";
import "./Map.scss";
import MapImage from "../../../../assets/images/map.svg";
import SVG from "react-inlinesvg";
import Dot from "../Dot/Dot";
import { getCitiesPollutionData } from "../../redux/map/map.actions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import pollutionComparisonContent from "../PollutionComparison/pollutionComparisonContent";

const Map = ({ citiesPollutionData }) => {
  useEffect(() => {
    getCitiesPollutionData(pollutionComparisonContent);
  });

  return (
    <div className="map">
      <SVG src={MapImage} className="map__image" />
      {citiesPollutionData.map(cityData => (
        <Dot
          key={cityData.id}
          className={`dot--${cityData.location}`}
          backgroundColor={cityData.color}
        />
      ))}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getCitiesPollutionData: citiesPollutionData =>
    dispatch(getCitiesPollutionData(citiesPollutionData))
});

const mapStateToProps = ({ map: { citiesPollutionData } }) => ({
  citiesPollutionData
});

Map.propTypes = {
  getCitiesPollutionData: PropTypes.func,
  citiesPollutionData: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
