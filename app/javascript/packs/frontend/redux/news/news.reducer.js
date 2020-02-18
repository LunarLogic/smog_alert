import { newsActionTypes } from "./news.types";

const INITIAL_STATE = {
  articles: [],
  article: {},
  newsLoader: true,
  articleLoader: true,
  error: false
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case newsActionTypes.GET_ARTICLES_PENDING:
      return {
        ...state,
        newsLoader: true,
        error: false
      };
    case newsActionTypes.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        newsLoader: false,
        error: false
      };
    case newsActionTypes.GET_ARTICLES_FAILURE:
      return {
        ...state,
        newsLoader: false,
        error: true
      };
    case newsActionTypes.GET_ARTICLE_PENDING:
      return {
        ...state,
        articleLoader: true,
        error: false
      };
    case newsActionTypes.GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        articleLoader: false,
        error: false
      };
    case newsActionTypes.GET_ARTICLE_FAILURE:
      return {
        ...state,
        articleLoader: false,
        error: true
      };
    case newsActionTypes.RESET_ARTICLE:
      return {
        ...state,
        article: {},
        articles: [],
        newsLoader: true
      };
    default:
      return state;
  }
};

export default newsReducer;
