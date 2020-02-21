import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import { CustomButton } from "../";
import navigationContent from "../Navigation/navigationContent";

import "./NavigationMobile.scss";
import "./Hamburger.scss";

import {
  selectPath,
  selectOrganizationDetails
} from "../../redux/application/application.selectors";

const NavigationMobile = ({ path, organizationDetails }) => {
  const { links, button } = navigationContent;
  const { name, logo } = organizationDetails;

  const [hamburgerActive, setHamburgerActive] = useState(false);

  return (
    <header className="hamburger-navigation">
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
            <NavLink
              key={link.displayName}
              activeClassName="activeLink"
              className="hamburger-navigation__links-item"
              to={link.path}
              onClick={() => {
                setHamburgerActive(false);
              }}
            >
              {link.displayName}
            </NavLink>
          ))}
          {path.path === "/" ? (
            <ScrollLink
              className="hamburger-navigation__links-item"
              to="map-section"
              smooth={true}
              duration={500}
              offset={-50}
              onClick={() => {
                setHamburgerActive(false);
              }}
            >
              Mapa
            </ScrollLink>
          ) : (
            <a
              className="hamburger-navigation__links-item"
              href="/#map-section"
            >
              Mapa
            </a>
          )}
          <div className="hamburger-navigation__links-button">
            <CustomButton text={button} />
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  path: selectPath,
  organizationDetails: selectOrganizationDetails
});

NavigationMobile.propTypes = {
  path: PropTypes.string,
  organizationDetails: PropTypes.object
};

export default connect(mapStateToProps)(NavigationMobile);
