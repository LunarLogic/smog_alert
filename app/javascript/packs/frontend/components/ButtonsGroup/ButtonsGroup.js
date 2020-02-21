import React from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import "./ButtonsGroup.scss";

const ButtonsGroup = ({ linkTo, contactLinks }) => {
  return (
    <div className="buttons-group">
      <Link className="buttons-group__button" to={linkTo.href}>
        {linkTo.text}
      </Link>
      <div className="buttons-group__links">
        {contactLinks.map((link, index) => (
          <a
            key={`buttons-group-link-${index}`}
            className="buttons-group__links-item"
            href={link.link}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

ButtonsGroup.propTypes = {
  linkTo: PropTypes.object,
  contactLinks: PropTypes.array
};

export default ButtonsGroup;
