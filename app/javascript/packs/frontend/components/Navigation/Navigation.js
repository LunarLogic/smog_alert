import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { createStructuredSelector } from "reselect";

import { CustomButton } from "../";
import navigationContent from "./navigationContent";
import Logo from "../../assets/logo.jpg";

import { selectPath } from "../../redux/redux.selectors";

import "./Navigation.scss";

const Navigation = path => {
  const { links, button, brand } = navigationContent;

  return (
    <header className="navigation">
      <div className="navigation-container">
        <div className="navigation__brand">
          <Link to="/">
            <div className="navigation__brand-logo">
              <img
                className="navigation__brand-logo-img"
                src={Logo}
                alt="logo"
              />
            </div>
          </Link>
          <Link to="/">
            <div className="navigation__brand-name">{brand}</div>
          </Link>
        </div>
        <div className="navigation__links">
          {links.map(link => (
            <NavLink
              key={link.displayName}
              className="navigation__links-item"
              to={link.path}
            >
              {link.displayName}
            </NavLink>
          ))}
          {path.path === "/" ? (
            <ScrollLink
              className="navigation__links-item"
              to="map-section"
              smooth={true}
              duration={500}
              offset={-50}
            >
              Mapa
            </ScrollLink>
          ) : (
            <a className="navigation__links-item" href="/#map-section">
              Mapa
            </a>
          )}
          <CustomButton text={button} />
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  path: selectPath
});

export default connect(mapStateToProps)(Navigation);
