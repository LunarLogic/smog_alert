import React from "react";
import "./Navigation.scss";

const Navigation = () => {
  return (
    <header className="navigation">
      <div className="navigation__brand">
        <div className="navigation__brand-logo"></div>
        <div className="navigation__brand-name">Zabierzowski Alarm Smogowy</div>
      </div>
      <div className="navigation__links">
        <div className="navigation__links-item">Aktualności</div>
        <div className="navigation__links-item">Czym oddycham</div>
        <div className="navigation__links-item">Rozwiązania</div>
        <div className="navigation__links-item">Statystyki</div>
        <div className="navigation__links-item">Mapa</div>
        <div className="navigation__links-item">Zmień Piec</div>
      </div>
    </header>
  );
};

export default Navigation;
