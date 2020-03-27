import React, { useState } from "react";
import axios from "axios";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

import { setFormContent } from "../../redux/form/form.actions";

import useForm from "./useForm";
import { stateSchema, validationStateSchema } from "./formSchemas";

import "./Form.scss";

const Form = ({ setFormContent }) => {
  const [success, setSuccess] = useState(false);
  const answer = {};

  const onSubmitForm = state => {
    answer["sender_name"] = state.name.value;
    answer["sender_email"] = state.email.value;
    answer["message"] = state.message.value;
    axios.post("/api/internal/contact_form", answer).then(
      response => {
        switch (response.status) {
          case 204:
            console.log("204", response);
            setFormContent(answer);
            break;
          case 200:
            console.log("200", response);
            break;
        }
      },
      error => {
        console.log("error", error);
      }
    );
  };

  const { state, handleOnChange, handleOnSubmit, disabled } = useForm(
    stateSchema,
    validationStateSchema,
    onSubmitForm
  );

  return (
    <div className="form">
      <form onSubmit={handleOnSubmit}>
        <div className="form-field">
          <label className="form-field-label" htmlFor="name">
            <span className="form-field-label--title">Imię:</span>
            <input
              type="text"
              name="name"
              value={state.name.value}
              onChange={handleOnChange}
            />
          </label>
          {state.name.error && (
            <p className="form-field-error">{state.name.error}</p>
          )}
        </div>
        <div className="form-field">
          <label className="form-field-label" htmlFor="email">
            <span className="form-field-label--title">Adres e-mail:</span>
            <input
              type="email"
              name="email"
              value={state.email.value}
              onChange={handleOnChange}
            />
          </label>
          {state.email.error && (
            <p className="form-field-error">{state.email.error}</p>
          )}
        </div>
        <div className="form-field">
          <label className="form-field-label" htmlFor="tags">
            <span className="form-field-label--title">Treść wiadomości:</span>
            <textarea
              name="message"
              value={state.message.value}
              onChange={handleOnChange}
            />
          </label>
          {state.message.error && (
            <p className="form-field-error">{state.message.error}</p>
          )}
        </div>
        <div className="form-submit">
          <input
            className="form-submit-btn"
            type="submit"
            name="submit"
            disabled={disabled}
            value="Wyślij"
          />
        </div>
        {success && <div>Twoja wiadomość została wysłana</div>}
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setFormContent: answer => dispatch(setFormContent(answer))
});

export default connect(null, mapDispatchToProps)(Form);
