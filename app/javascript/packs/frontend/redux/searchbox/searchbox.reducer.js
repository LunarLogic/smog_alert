import searchboxActionTypes from "./searchbox.types";

const INITIAL_STATE = {
  location_display_name: "Zabierzów, Wapienna"
};

const searchboxReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchboxActionTypes.SET_CHOSEN_CITY:
      return {
        ...state,
        location_display_name: action.payload
      };
    default:
      return state;
  }
};

export default searchboxReducer;
