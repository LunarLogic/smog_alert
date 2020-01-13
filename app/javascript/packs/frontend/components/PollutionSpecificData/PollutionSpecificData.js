import React from "react";
import { PropTypes } from "prop-types";

import { PollutionIndexData } from "..";
import { setLimit, setPercent } from "../../helpers";
import {
  PollutionOverviewFace,
  PollutionOverviewText
} from "./PollutionSpecificData.styles.jsx";
import "./PollutionSpecificData.scss";

const PollutionSpecificData = ({ display_name, color, status, data }) => {
  return (
    <div className="pollution-specific-data">
      <div className="pollution-specific-data__label">
        Aktualna jakość powietrza dla lokalizacji{" "}
        <span className="pollution-specific-data__label--bold">
          {display_name}
        </span>
      </div>
      <div className="pollution-specific-data__info">
        <div className="pollution-specific-data__info--overview">
          <PollutionOverviewFace color={color} />
          <PollutionOverviewText color={color}>{status}</PollutionOverviewText>
        </div>
        <div className="pollution-specific-data__info--specific">
          {data.map(data => {
            return (
              <PollutionIndexData
                key={data.name}
                indicator={data.name}
                value={data.value}
                percent={setPercent(data.name, data.value)}
                limit={setLimit(data.name)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

PollutionSpecificData.propTypes = {
  display_name: PropTypes.string,
  color: PropTypes.string,
  status: PropTypes.string,
  data: PropTypes.array
};

export default PollutionSpecificData;
