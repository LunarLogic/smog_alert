import styled from "styled-components";
import { bp420 } from "../../styles/_variables.scss";

export const CalendarLegendBoxDiv = styled.div`
    height: 3rem;
    text-transform: uppercase;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    line-height: 1.7rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 1px 1px 7px rgba(0, 0, 0, 0.15);
    padding: 1rem 0.5rem;
    color: white;
    background-color: ${({ backgroundColor }) => backgroundColor}

    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width: ${bp420}) {
      font-size: 1.6rem;
      line-height: 1.9rem;
    }
`;
