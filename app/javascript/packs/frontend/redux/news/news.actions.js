import { newsActionTypes } from "./news.types";
import axios from "axios";

export const getArticles = () => {
  return dispatch => {
    dispatch({ type: newsActionTypes.GET_ARTICLES_PENDING });

    return axios
      .get("/api/internal/articles")
      .then(({ data }) => {
        dispatch({
          type: newsActionTypes.GET_ARTICLES_SUCCESS,
          payload: data.data
        });
      })
      .catch(({ response }) =>
        dispatch({
          type: newsActionTypes.GET_ARTICLES_FAILURE,
          payload: response
        })
      );
  };
};

export const getArticle = id => {
  return dispatch => {
    dispatch({ type: newsActionTypes.GET_ARTICLE_PENDING });

    return axios
      .get(`/api/internal/articles/${id}`)
      .then(({ data }) => {
        dispatch({
          type: newsActionTypes.GET_ARTICLE_SUCCESS,
          payload: data.data
        });
      })
      .catch(({ response }) =>
        dispatch({
          type: newsActionTypes.GET_ARTICLE_FAILURE,
          payload: response
        })
      );
  };
};

export const resetArticle = () => {
  return { type: newsActionTypes.RESET_ARTICLE, payload: {} };
};
