import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TwitterIcon from "@material-ui/icons/Twitter";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { ButtonsGroup } from "..";

import "./NoItemFound.scss";

import { selectOrganizationDetails } from "../../redux/application/application.selectors";

const NoItemFound = ({ image, text, organizationDetails, linkTo }) => {
  const { facebook, email } = organizationDetails;

  const contactLinks = [
    { link: facebook, icon: <FacebookIcon /> },
    { link: `mailto:${email}`, icon: <MailOutlineIcon /> },
    { link: "https://twitter.com/alarm_smogowy", icon: <TwitterIcon /> }
  ];
  return (
    <div className="no-item-found">
      <div className="no-item-found__image">{image}</div>
      <div className="no-item-found__text">{text}</div>
      <ButtonsGroup linkTo={linkTo} contactLinks={contactLinks} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  organizationDetails: selectOrganizationDetails
});

NoItemFound.propTypes = {
  image: PropTypes.object,
  text: PropTypes.string,
  organizationDetails: PropTypes.object,
  linkTo: PropTypes.object
};

export default connect(mapStateToProps)(NoItemFound);
