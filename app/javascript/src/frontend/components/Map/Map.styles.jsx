import styled from "styled-components";

export const MapContainer = styled.svg`
  width: 100%;
  font-size: 1.4rem;
  cursor: pointer;
`;

export const MapPath = styled.path`
  fill: ${({ fill }) => fill};
  opacity: ${({ opacity }) => opacity};
`;

export const MapText = styled.text`
  fill: #0e0f20;
`;

export const MapDot = styled.circle`
  fill: ${({ color }) => color};
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.22));
`;
