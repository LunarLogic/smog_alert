import React from "react";
import useForm from "./useForm";
import { stateSchema, validationStateSchema } from "./formSchemas";

import "./Form.scss";

const Form = () => {
  const onSubmitForm = state => {
    alert(JSON.stringify(state, null, 2));
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
      </form>
    </div>
  );
};

export default Form;
