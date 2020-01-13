import styled from "styled-components";

export const Indicator = styled.div`
  grid-column-start: ${({ indicator }) => indicator};
  //grid-column: 4 / 5;
  border-top: 1.6rem solid ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
  border-left: 1.6rem solid transparent;
  border-right: 1.6rem solid transparent;
  justify-self: center;
  width: 0;
  height: 0;
`;
