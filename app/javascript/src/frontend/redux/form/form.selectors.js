import { createSelector } from "reselect";

const selectForm = state => state.form;

export const selectFormContent = createSelector(
  [selectForm],
  form => form.formContent
);
