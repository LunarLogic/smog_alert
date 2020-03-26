import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";

import { ContactDetail, FormModal } from "../";

import { FooterLogo } from "./Footer.styles.jsx";
import "./Footer.scss";

import { selectOrganizationDetails } from "../../redux/application/application.selectors";

const Footer = ({ organizationDetails }) => {
  const { logo, name, description, email, facebook } = organizationDetails;
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const footerContent = [
    {
      value: "Formularz kontaktowy",
      icon: <SubjectOutlinedIcon />,
      type: "contact-form",
      handleClick: openModal
    },
    {
      value: email,
      icon: <MailOutlineIcon />,
      type: "email",
      handleClick: null
    },
    {
      value: facebook,
      icon: <FacebookIcon />,
      type: "facebook",
      handleClick: null
    }
  ];

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer__info">
          <FooterLogo image={logo} />
          <div className="footer__info-brand">{name}</div>
          <div className="footer__info-description">{description}</div>
          <div className="footer__info-credentials">
            W serwisie wykorzystano dane z pyłomierzy firmy{" "}
            <a href="https://airly.eu/pl">Airly</a>, a także informacje o sile
            wiatru ze stacji meteo AGH, Kraków, 50° 04 N 19° 57 E.
          </div>
        </div>
        <div className="footer__contact">
          <div className="footer__contact-heading">Skontaktuj się z nami:</div>
          <div className="footer__contact-details">
            {footerContent.map((detail, index) => (
              <ContactDetail
                key={`footer-contact-detail-${index}`}
                icon={detail.icon}
                item={detail.value}
                type={detail.type}
                handleClick={detail.handleClick}
              />
            ))}
          </div>
        </div>
      </div>
      <FormModal isOpen={modalOpen} closeModal={closeModal} />
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
