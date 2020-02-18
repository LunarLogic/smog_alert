import { createSelector } from "reselect";

const selectApplication = state => state.application;

export const selectPath = createSelector(
  [selectApplication],
  application => application.path
);

export const selectOrganizationDetails = createSelector(
  [selectApplication],
  application => application.organizationDetails
);
