import { setFormContent } from "./form.actions";
import formActionTypes from "./form.types";

const INITIAL_STATE = {
  formContent: {}
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case formActionTypes.SET_FORM_CONTENT:
      return {
        ...state,
        formContent: action.payload
      };
    default:
      return state;
  }
};

export default formReducer;
