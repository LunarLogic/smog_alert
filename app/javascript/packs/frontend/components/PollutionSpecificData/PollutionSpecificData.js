import React from "react";
import { PropTypes } from "prop-types";

import { PollutionIndexData } from "..";
import { setLimit, setPercent, setEmot } from "../../helpers";
import { PollutionOverviewText } from "./PollutionSpecificData.styles.jsx";
import "./PollutionSpecificData.scss";
import uuid from "uuid";

const PollutionSpecificData = ({
  display_name,
  color,
  lastHourMeasurement,
  status,
  data
}) => {
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
          <div className="pollution-specific-data__info--overview-face">
            {setEmot(lastHourMeasurement)}
          </div>
          <PollutionOverviewText color={color}>
            {status ? status : "brak pomiaru"}
          </PollutionOverviewText>
        </div>
        <div className="pollution-specific-data__info--specific">
          {data.map(data => {
            const percent = setPercent(data.name, data.value);
            return (
              <PollutionIndexData
                key={uuid.v4()}
                indicator={data.name}
                value={data.value}
                percent={data.value !== "--" ? percent : "--"}
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
  lastHourMeasurement: PropTypes.object,
  status: PropTypes.string,
  data: PropTypes.array
};

export default PollutionSpecificData;
