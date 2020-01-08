import React from "react";
import { Link, NavLink } from "react-router-dom";

import { CustomButton } from "../";
import navigationContent from "./navigationContent";
import Logo from "../../assets/logo.jpg";

import "./Navigation.scss";

const Navigation = () => {
  const { links, button, brand } = navigationContent;

  return (
    <header className="navigation">
      <div className="navigation__brand">
        <Link to="/">
          <div className="navigation__brand-logo">
            <img className="navigation__brand-logo-img" src={Logo} alt="logo" />
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
        <CustomButton text={button} />
      </div>
    </header>
  );
};

export default Navigation;
