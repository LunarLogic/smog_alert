import { newsActionTypes } from "./news.types";

const INITIAL_STATE = {
  articles: null
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case newsActionTypes.GET_ARTICLES:
      return {
        ...state,
        articles: action.payload
      };
    default:
      return state;
  }
};

export default newsReducer;
