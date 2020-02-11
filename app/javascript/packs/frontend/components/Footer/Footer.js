import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import { ContactDetail } from "../";

import { FooterLogo } from "./Footer.styles.jsx";
import "./Footer.scss";

import { selectOrganizationDetails } from "../../redux/application/application.selectors";

const Footer = ({ organizationDetails }) => {
  const { logo, name, description, email, facebook } = organizationDetails;
  const footerContent = [email, facebook];

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer__info">
          <FooterLogo image={logo} />
          <div className="footer__info-brand">{name}</div>
          <div className="footer__info-description">{description}</div>
          <div className="footer__info-credentials">
            W serwisie wykorzystano dane z pyłomierza własnego oraz dane z
            pyłomierzy firmy Airly, a także informacje o sile wiatru ze stacji
            meteo AGH, Kraków, 50° 04 N 19° 57 E.
          </div>
        </div>
        <div className="footer__contact">
          <div className="footer__contact-heading">Skontaktuj się z nami:</div>
          <div className="footer__contact-details">
            {footerContent.map(detail => (
              <ContactDetail key={detail} item={detail} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  organizationDetails: selectOrganizationDetails
});

Footer.propTypes = {
  organizationDetails: PropTypes.object
};

export default connect(mapStateToProps)(Footer);
