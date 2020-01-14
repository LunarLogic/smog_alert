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
  background: linear-gradient(
    196.62deg,
    ${({ gradient }) => gradient.color1} 0%,
    ${({ gradient }) => gradient.color2} 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;
