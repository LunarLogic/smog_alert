import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import TwitterIcon from "@material-ui/icons/Twitter";

import "./NoItemFound.scss";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectOrganizationDetails } from "../../redux/application/application.selectors";
import { connect } from "react-redux";

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
      <Link className="no-item-found__back-button" to={linkTo.href}>
        {linkTo.text}
      </Link>
      <div className="no-item-found__links">
        {contactLinks.map((link, index) => (
          <a
            key={`no-item-found-link-${index}`}
            className="no-item-found__links-item"
            href={link.link}
          >
            {link.icon}
          </a>
        ))}
      </div>
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
