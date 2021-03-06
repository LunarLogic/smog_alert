import React from "react";
import { PropTypes } from "prop-types";

import "./ContactDetail.scss";

const ContactDetail = ({ icon, item, type, handleClick }) => {
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
      case "contact-form":
        return <span className="contact-detail__item">{item}</span>;
      default:
        return (
          <a href={item} className="contact-detail__item">
            {item}
          </a>
        );
    }
  };

  return (
    <div className="contact-detail" onClick={handleClick ? handleClick : null}>
      <div className="contact-detail__icon">{icon}</div>
      {setLinkType(type, item)}
    </div>
  );
};

ContactDetail.propTypes = {
  item: PropTypes.string,
  icon: PropTypes.object,
  type: PropTypes.string
};

export default ContactDetail;
