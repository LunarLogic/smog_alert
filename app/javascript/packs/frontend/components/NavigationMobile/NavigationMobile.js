import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import { CustomButton } from "../";
import navigationContent from "../Navigation/navigationContent";

import "./NavigationMobile.scss";
import "./Hamburger.scss";

import { selectOrganizationDetails } from "../../redux/application/application.selectors";

const NavigationMobile = ({ organizationDetails }) => {
  const { links, button } = navigationContent;
  const { name, logo } = organizationDetails;
  const path = useLocation().pathname;

  const [hamburgerActive, setHamburgerActive] = useState(false);

  return (
    <nav className="hamburger-navigation">
      <div className="hamburger-navigation-container">
        <div className="hamburger-navigation--closed">
          <div className="hamburger-navigation__brand">
            <Link
              to="/"
              onClick={() => {
                setHamburgerActive(false);
              }}
            >
              <div className="hamburger-navigation__brand-logo">
                {logo ? (
                  <img
                    className="hamburger-navigation__brand-logo-img"
                    src={logo}
                  />
                ) : (
                  <div className="hamburger-navigation__brand-logo-img"></div>
                )}
              </div>
            </Link>
            <Link to="/">
              <div className="hamburger-navigation__brand-name">{name}</div>
            </Link>
          </div>
          <div className="hamburger-navigation__links">
            <CustomButton text={button} />
            <button
              className={`hamburger hamburger--spin ${
                hamburgerActive ? "is-active" : ""
              }`}
              aria-label="hamburger-menu"
              type="button"
              onClick={() => {
                setHamburgerActive(!hamburgerActive);
              }}
            >
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </div>
        <div
          className={`hamburger-navigation--open ${
            hamburgerActive ? "activeNavigation" : ""
          }`}
        >
          {links.map(link => (
            <Link
              key={link.displayName}
              className={
                path === link.path
                  ? "hamburger-navigation__links-item isActive"
                  : "hamburger-navigation__links-item"
              }
              to={link.path}
              onClick={() => {
                setHamburgerActive(false);
              }}
            >
              {link.displayName}
            </Link>
          ))}
          <div className="hamburger-navigation__links-button">
            <CustomButton text={button} />
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = createStructuredSelector({
  organizationDetails: selectOrganizationDetails
});

NavigationMobile.propTypes = {
  organizationDetails: PropTypes.object
};

export default connect(mapStateToProps)(NavigationMobile);
