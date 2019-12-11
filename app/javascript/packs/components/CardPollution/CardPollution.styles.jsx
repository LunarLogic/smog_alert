import styled from "styled-components";

export const OverviewText = styled.div`
  font-size: 2.1rem;
  line-height: 2.4rem;
  color: ${({ color }) => color};
  font-weight: bold;
  margin-top: 1.2rem;
`;

export const DataSpecific = styled.div`
  width: 50%;
  background: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
`;
