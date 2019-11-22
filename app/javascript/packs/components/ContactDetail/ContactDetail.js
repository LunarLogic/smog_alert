import React from "react";
import "./ContactDetail.scss";
import { PropTypes } from "prop-types";

const ContactDetail = ({ item }) => {
  return (
    <div className="contact-detail">
      <div className="contact-detail__icon"></div>
      <div className="contact-detail__item">{item}</div>
    </div>
  );
};

ContactDetail.propTypes = {
  item: PropTypes.string
};

export default ContactDetail;
