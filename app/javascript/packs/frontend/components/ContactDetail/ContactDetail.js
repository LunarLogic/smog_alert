import React from "react";
import { PropTypes } from "prop-types";

import "./ContactDetail.scss";

const ContactDetail = ({ item }) => {
  return (
    <div className="contact-detail">
      <div className="contact-detail__icon" />
      <div className="contact-detail__item">{item}</div>
    </div>
  );
};

ContactDetail.propTypes = {
  item: PropTypes.string
};

export default ContactDetail;
