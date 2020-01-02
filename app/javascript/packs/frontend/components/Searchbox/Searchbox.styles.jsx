import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  margin-left: 1.2rem;
  font-size: 1.6rem;
  color: ${({ textColor }) => textColor};
`;
