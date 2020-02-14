import styled from "styled-components";
import { frameColor, bp800, bp1000 } from "../../styles/_variables.scss";

export const ArticleOverviewImage = styled.div`
  width: 25%;

  ::after {
    padding-bottom: 100%;
    content: "";
    display: block;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center;
    border-radius: 0.6rem;
    border: 0.1rem solid ${frameColor};
  }

  @media only screen and (max-width: ${bp1000}) {
    width: 50%;
  }

  @media only screen and (max-width: ${bp800}) {
    width: 100%;
    margin-bottom: 2rem;
  }
`;
