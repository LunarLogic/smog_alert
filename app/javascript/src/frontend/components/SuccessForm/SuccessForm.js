import React from "react";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";

import { formLabel } from "../../helpers/formLabel";

import "./SuccessForm.scss";

const SuccessForm = ({ formContent }) => {
  const printResponses = () => {
    return Object.keys(formContent).map(key => (
      <div className="success-form-field" key={key}>
        <div className="success-form-field__key">{formLabel(key)}:</div>
        <div
          className={
            key === "message"
              ? "success-form-field__value textarea"
              : "success-form-field__value"
          }
        >
          {formContent[key]}
        </div>
      </div>
    ));
  };

  return (
    <div className="success-form">
      <div className="success-form__header">
        <div className="success-form__header-icon">
          <CheckCircleOutlinedIcon />
        </div>
        <div className="success-form__header-text">
          Twoja wiadomość została wysłana
        </div>
      </div>
      <div className="success-form__content">{printResponses()}</div>
    </div>
  );
};

export default SuccessForm;
