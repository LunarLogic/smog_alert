import React, { useEffect } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TwitterIcon from "@material-ui/icons/Twitter";

import { PageTitle, ButtonsGroup } from "../../components";

import "./Error404.scss";

import { setCurrentPath } from "../../redux/application/application.actions";
import { createStructuredSelector } from "reselect";
import { selectOrganizationDetails } from "../../redux/application/application.selectors";

const Error404 = ({ setCurrentPath, organizationDetails }) => {
  useEffect(() => {
    setCurrentPath("error");
  });

  const { email, facebook } = organizationDetails;

  const contactLinks = [
    { link: facebook, icon: <FacebookIcon /> },
    { link: `mailto:${email}`, icon: <MailOutlineIcon /> },
    { link: "https://twitter.com/alarm_smogowy", icon: <TwitterIcon /> }
  ];
  return (
    <div className="error-404">
      <PageTitle title="Strona nie istnieje" />
      <h1 className="error-404__title">404</h1>
      <p className="error-404__text">
        Wygląda na to, że strona o podanym adresie nie istnieje. Mogła zostać
        usunięta lub jej nazwa została zmieniona.
      </p>
      <p className="error-404__text">
        Wybierz jeden z linków w menu lub kliknij poniżej aby wrócić na stronę
        główną.
      </p>
      <ButtonsGroup
        linkTo={{ href: "/", text: "Powrót na stronę główną" }}
        contactLinks={contactLinks}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setCurrentPath: path => dispatch(setCurrentPath(path))
});

const mapStateToProps = createStructuredSelector({
  organizationDetails: selectOrganizationDetails
});

Error404.propTypes = {
  setCurrentPath: PropTypes.func,
  organizationDetails: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Error404);
