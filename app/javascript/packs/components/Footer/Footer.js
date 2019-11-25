import React from "react";
import "./Footer.scss";
import footerContent from "./footerContent";
import ContactDetail from "../ContactDetail/ContactDetail";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__info">
        <div className="footer__info-logo"></div>
        <div className="footer__info-brand">Zabierzowski Alarm Smogowy</div>
        <div className="footer__info-description">
          Stowarzyszenie tworzone przez ludzi, którzy lubią czyste powietrze i
          zielone drzewa
        </div>
        <div className="footer__info-credentials">
          W serwisie wykorzystano dane z pyłomierza własnego oraz dane z
          pyłomierzy firmy Airly, a także informacje o sile wiatru ze stacji
          meteo AGH, Kraków, 50° 04 N 19° 57 E.
        </div>
      </div>
      <div className="footer__contact">
        <div className="footer__contact-heading">Skontaktuj się z nami:</div>
        <div className="footer__contact-details">
          {footerContent.map(detail => (
            <ContactDetail key={detail} item={detail} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
