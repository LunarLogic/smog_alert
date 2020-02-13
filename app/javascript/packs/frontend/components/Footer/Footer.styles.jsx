import styled from "styled-components";
import { frameColor } from "../../styles/_variables.scss";

export const FooterLogo = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-image: url(${({ image }) => image});
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  border: 0.1rem solid ${frameColor};
`;
