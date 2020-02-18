import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";

import { CustomButton } from "../";
import navigationContent from "./navigationContent";

import {
  selectPath,
  selectOrganizationDetails
} from "../../redux/application/application.selectors";

import "./Navigation.scss";
import { resetArticle } from "../../redux/news/news.actions";

const Navigation = ({ path, organizationDetails, resetArticle }) => {
  const { links, button } = navigationContent;
  const { name, logo } = organizationDetails;

  return organizationDetails ? (
    <header className="navigation">
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
            <NavLink
              key={link.displayName}
              className="navigation__links-item"
              onClick={() => {
                path !== "/aktualnosci" ? resetArticle() : null;
              }}
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
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  path: selectPath,
  organizationDetails: selectOrganizationDetails
});

const mapDispatchToProps = dispatch => ({
  resetArticle: () => dispatch(resetArticle())
});

Navigation.propTypes = {
  path: PropTypes.string,
  organizationDetails: PropTypes.object,
  resetArticle: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
