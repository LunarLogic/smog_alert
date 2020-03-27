import formActionTypes from "./form.types";

export const setFormContent = payload => ({
  type: formActionTypes.SET_FORM_CONTENT,
  payload: payload
});
