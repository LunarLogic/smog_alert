import styled from "styled-components";

export const Indicator = styled.div`
  grid-column-start: ${({ indicator }) => indicator};
  //grid-column: 4 / 5;
  border-top: 1.6rem solid ${({ color }) => color};
  border-left: 1.6rem solid transparent;
  border-right: 1.6rem solid transparent;
  width: 0;
  height: 0;
`;
