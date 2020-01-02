import React from "react";

import { CustomButton } from "../";
import navigationContent from "./navigationContent";

import "./Navigation.scss";

const Navigation = () => {
  const { links, button, brand } = navigationContent;

  return (
    <header className="navigation">
      <div className="navigation__brand">
        <div className="navigation__brand-logo"></div>
        <div className="navigation__brand-name">{brand}</div>
      </div>
      <div className="navigation__links">
        {links.map(link => (
          <div key={link} className="navigation__links-item">
            {link}
          </div>
        ))}
        <CustomButton text={button} />
      </div>
    </header>
  );
};

export default Navigation;
