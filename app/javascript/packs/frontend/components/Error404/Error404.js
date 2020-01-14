import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => (
  <div className="error-404">
    <h1 className="error-404__title">404</h1>
    <p className="error-404__text">
      Wygląda na to, że strona o podanym adresie nie istnieje. Wybierz jeden z
      linków w menu lub kliknij poniżej aby wrócić na stronę główną.
    </p>
    <Link to="/">Powrót na stronę główną</Link>
  </div>
);

export default Error404;
