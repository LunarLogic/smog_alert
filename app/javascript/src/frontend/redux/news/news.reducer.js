import { newsActionTypes } from "./news.types";

const INITIAL_STATE = {
  articles: [],
  pagination: {},
  article: {},
  newsLoader: true,
  articleLoader: true,
  error: false,
  errorCode: null,
  articlesPage: null
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case newsActionTypes.GET_ARTICLES_PENDING:
      if (!state.articles.length) {
        return {
          ...state,
          newsLoader: true,
          error: false
        };
      }
      return state;
    case newsActionTypes.GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload.data,
        pagination: action.payload.meta.pagination,
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
        error: true,
        errorCode: action.payload.status
      };
    case newsActionTypes.RESET_ARTICLE:
      return {
        ...state,
        article: {},
        newsLoader: true
      };
    case newsActionTypes.SET_ARTICLES_PAGE:
      return {
        ...state,
        articlesPage: action.payload
      };
    default:
      return state;
  }
};

export default newsReducer;
