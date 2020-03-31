import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { setFormContent } from "../../redux/form/form.actions";
import useForm from "./useForm";
import {
  stateSchema,
  frontValidationStateSchema,
  backendFormAnswersSchema
} from "./formSchemas";
import { FORM_VALIDATION_PATH } from "../../helpers/paths";

import "./Form.scss";

const Form = ({ setFormContent }) => {
  const [error, setError] = useState(false); // Error 500
  const [backendValidationState, setBackendValidationState] = useState(
    stateSchema
  );

  const validateForm = formAnswers =>
    axios.post(FORM_VALIDATION_PATH, formAnswers).then(
      response => {
        switch (response.status) {
          case 204:
            setFormContent(formAnswers); // set form answers in global state
            setError(false);
            break;
          case 200:
            for (const key in response.data.errors) {
              let error = response.data.errors[key][0];
              let value = "";
              setBackendValidationState(prevState => ({
                ...prevState,
                [key]: { value, error }
              }));
            }
            setError(false);
            break;
        }
      },
      error => {
        setError(true);
      }
    );

  const onSubmitForm = frontValidationState => {
    // clear backend validation state
    setBackendValidationState(stateSchema);
    // generate object with answers based on front validation state
    const formAnswers = new Object(backendFormAnswersSchema);
    for (const key in formAnswers) {
      formAnswers[key] = frontValidationState[key].value;
    }
    // validate generated answers
    validateForm(formAnswers);
  };

  const {
    frontValidationState,
    handleOnChange,
    handleOnSubmit,
    disabled
  } = useForm(stateSchema, frontValidationStateSchema, onSubmitForm);

  const handleFieldOnChange = () => {
    handleOnChange();
    const name = event.target.name;
    backendValidationState[name].error = ""; // clear backend error if any
  };

  const countCharacters = () =>
    5000 - frontValidationState.message.value.length;

  return (
    <div className="form">
      <p className="form-heading">Napisz do nas !</p>
      <form onSubmit={handleOnSubmit}>
        <div className="form-field">
          <label className="form-field-label" htmlFor="name">
            <span className="form-field-label--title required">Imię:</span>
            <input
              type="text"
              name="sender_name"
              value={frontValidationState.sender_name.value}
              onChange={handleOnChange}
            />
          </label>
          {frontValidationState.sender_name.error && (
            <p className="form-field-error">
              {frontValidationState.sender_name.error}
            </p>
          )}
          {!frontValidationState.sender_name.error &&
            backendValidationState.sender_name.error && (
              <p className="form-field-error">
                {backendValidationState.sender_name.error}
              </p>
            )}
        </div>
        <div className="form-field">
          <label className="form-field-label" htmlFor="email">
            <span className="form-field-label--title required">
              Adres e-mail:
            </span>
            <input
              type="email"
              name="sender_email"
              value={frontValidationState.sender_email.value}
              onChange={handleFieldOnChange}
            />
          </label>
          {frontValidationState.sender_email.error && (
            <p className="form-field-error">
              {frontValidationState.sender_email.error}
            </p>
          )}
          {!frontValidationState.sender_email.error &&
            backendValidationState.sender_email.error && (
              <p className="form-field-error">
                {backendValidationState.sender_email.error}
              </p>
            )}
        </div>
        <div className="form-field">
          <label className="form-field-label" htmlFor="tags">
            <span className="form-field-label--title required">
              Treść wiadomości:
            </span>
            <textarea
              name="message"
              value={frontValidationState.message.value}
              onChange={handleOnChange}
              maxLength="5000"
            />
          </label>
          <p className="form-field-counter">
            Pozostało {countCharacters()} znaków
          </p>
          {frontValidationState.message.error && (
            <p className="form-field-error">
              {frontValidationState.message.error}
            </p>
          )}
          {!frontValidationState.message.error &&
            backendValidationState.message.error && (
              <p className="form-field-error">
                {backendValidationState.message.error}
              </p>
            )}
        </div>
        {error && (
          <div className="form-submit--error">
            Wysyłanie wiadomości nie powiodło się.
            <br />
            Spróbuj raz jeszcze lub napisz do nas bezpośrednio na:
            <a href="mailto:zabierzow-smog@gmail.com">
              {" "}
              zabierzow-smog@gmail.com
            </a>
          </div>
        )}
        <div className="form-submit">
          <input
            className="form-submit-btn"
            type="submit"
            name="submit"
            disabled={disabled}
            value="Wyślij"
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setFormContent: content => dispatch(setFormContent(content))
});

export default connect(null, mapDispatchToProps)(Form);
