import React from "react";
import "./Map.scss";
import MapImage from "../../../../assets/images/map.svg";
import SVG from "react-inlinesvg";

const Map = () => <SVG src={MapImage} className="map" />;

export default Map;
