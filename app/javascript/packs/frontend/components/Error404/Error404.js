import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { setCurrentPath } from "../../redux/application/application.actions";

const Error404 = ({ setCurrentPath }) => {
  useEffect(() => {
    setCurrentPath("error");
  });
  return (
    <div className="error-404">
      <h1 className="error-404__title">404</h1>
      <p className="error-404__text">
        Wygląda na to, że strona o podanym adresie nie istnieje. Wybierz jeden z
        linków w menu lub kliknij poniżej aby wrócić na stronę główną.
      </p>
      <Link to="/">Powrót na stronę główną</Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentPath: path => dispatch(setCurrentPath(path))
});

Error404.propTypes = {
  setCurrentPath: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Error404);
