import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { PollutionBar } from "../";
import { getCitiesPollutionData } from "../../redux/map/map.actions";

import "./PollutionComparison.scss";

class PollutionComparison extends React.Component {
  componentDidMount() {
    const { getCitiesPollutionData } = this.props;
    getCitiesPollutionData();
  }

  render() {
    const { citiesPollutionData } = this.props;

    let highestPollutionValue;
    let sortedPollutionData;

    if (citiesPollutionData.length !== 0) {
      sortedPollutionData = citiesPollutionData.sort(
        (a, b) => b.value - a.value
      );
      highestPollutionValue = sortedPollutionData[0].value;
    }

    return (
      <div className="pollution-comparison">
        {citiesPollutionData.length !== 0
          ? sortedPollutionData.map(cityData => {
              const { location, value, color } = cityData;
              const width = (value * 100) / highestPollutionValue;
              return (
                <PollutionBar
                  key={location}
                  width={width}
                  backgroundColor={color}
                  location={location}
                  value={value}
                />
              );
            })
          : "loading"}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCitiesPollutionData: citiesPollutionData =>
    dispatch(getCitiesPollutionData(citiesPollutionData))
});

const mapStateToProps = ({ map: { citiesPollutionData } }) => ({
  citiesPollutionData
});

PollutionComparison.propTypes = {
  getCitiesPollutionData: PropTypes.func,
  citiesPollutionData: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PollutionComparison);
