import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import { CustomButton } from "../";
import navigationContent from "./navigationContent";

import { selectOrganizationDetails } from "../../redux/application/application.selectors";

import "./Navigation.scss";

const Navigation = ({ organizationDetails }) => {
  const { links, button } = navigationContent;
  const { name, logo } = organizationDetails;
  const path = useLocation().pathname;

  return organizationDetails ? (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="navigation__brand">
          <Link to="/">
            <div className="navigation__brand-logo">
              {logo ? (
                <img className="navigation__brand-logo-img" src={logo} />
              ) : (
                <div className="navigation__brand-logo-img"></div>
              )}
            </div>
          </Link>
          <Link to="/">
            <div className="navigation__brand-name">{name}</div>
          </Link>
        </div>
        <div className="navigation__links">
          {links.map(link => (
            <Link
              key={link.displayName}
              className={
                path === link.path
                  ? "navigation__links-item isActive"
                  : "navigation__links-item"
              }
              to={link.path}
            >
              {link.displayName}
            </Link>
          ))}
          <Link key={button.displayName} to={button.path}>
            <CustomButton text={button.displayName} />
          </Link>
        </div>
      </div>
    </nav>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  organizationDetails: selectOrganizationDetails
});

Navigation.propTypes = {
  organizationDetails: PropTypes.object,
  resetArticle: PropTypes.func
};

export default connect(mapStateToProps)(Navigation);
