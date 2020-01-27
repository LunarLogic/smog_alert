import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { CustomButton } from "../";
import navigationContent from "../Navigation/navigationContent";
import Logo from "../../assets/logo.jpg";

import "./NavigationMobile.scss";
import "./Hamburger.scss";

const NavigationMobile = () => {
  const { links, button, brand } = navigationContent;

  const [hamburgerActive, setHamburgerActive] = useState(false);

  return (
    <header className="hamburger-navigation">
      <div className="hamburger-navigation--closed">
        <div className="hamburger-navigation__brand">
          <Link
            to="/"
            onClick={() => {
              setHamburgerActive(false);
            }}
          >
            <div className="hamburger-navigation__brand-logo">
              <img
                className="hamburger-navigation__brand-logo-img"
                src={Logo}
                alt="logo"
              />
            </div>
          </Link>
          <Link to="/">
            <div className="hamburger-navigation__brand-name">{brand}</div>
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
          hamburgerActive ? "isActive" : ""
        }`}
      >
        {links.map(link => (
          <NavLink
            key={link.displayName}
            className="hamburger-navigation__links-item"
            to={link.path}
            onClick={() => {
              setHamburgerActive(false);
            }}
          >
            {link.displayName}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default NavigationMobile;
