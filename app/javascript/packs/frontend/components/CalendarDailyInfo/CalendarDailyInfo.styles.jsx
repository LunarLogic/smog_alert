import styled from "styled-components";
import { warning } from "../../styles/_variables.scss";

export const CalendarDailyInfoNoData = styled.span`
  font-size: 1.6rem;
  line-height: 1.9rem;
  font-weight: bold;
  color: ${warning};
`;

export const CalendarDailyInfoMeasurement = styled.div`
  margin-bottom: 0.5rem;
`;
export const CalendarDailyInfoMeasurementName = styled.span`
  text-transform: uppercase;
  margin-right: 1rem;
  font-weight: 500;
`;
export const CalendarDailyInfoMeasurementValue = styled.span`
  font-size: 1.6rem;
  line-height: 1.9rem;
  font-weight: bold;
`;

export const CalendarDailyInfoDisclaimer = styled.div`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.5;
`;
