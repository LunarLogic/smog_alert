import React from "react";
import { PropTypes } from "prop-types";

import "./ContactDetail.scss";

const ContactDetail = ({ icon, item, type }) => {
  const setLinkType = (type, item) => {
    switch (type) {
      case "email":
        return (
          <a href={`mailto:${item}`} className="contact-detail__item">
            {item}
          </a>
        );
      case "phone":
        return (
          <a href={`tel:${item}`} className="contact-detail__item">
            {item}
          </a>
        );
      default:
        return (
          <a href={item} className="contact-detail__item">
            {item}
          </a>
        );
    }
  };

  return (
    <div className="contact-detail">
      <div className="contact-detail__icon">{icon}</div>
      {setLinkType(type, item)}
    </div>
  );
};

ContactDetail.propTypes = {
  item: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string
};

export default ContactDetail;
