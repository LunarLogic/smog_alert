import applicationActionTypes from "./application.types";

const INITIAL_STATE = {
  path: "",
  organizationDetails: {}
};

const applicationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case applicationActionTypes.SET_CURRENT_PATH:
      return {
        ...state,
        path: action.payload
      };
    case applicationActionTypes.GET_ORGANIZATION_DETAILS:
      return {
        ...state,
        organizationDetails: action.payload
      };
    default:
      return state;
  }
};

export default applicationReducer;
