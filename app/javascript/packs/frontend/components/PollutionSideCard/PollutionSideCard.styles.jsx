import styled from "styled-components";

export const PollutionOverviewFace = styled.div`
  width: 7.9rem;
  height: 7.9rem;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const PollutionOverviewText = styled.div`
  font-size: 2.1rem;
  line-height: 2.4rem;
  color: ${({ color }) => color};
  font-weight: bold;
  text-align: center;
  margin-top: 1.2rem;
`;
