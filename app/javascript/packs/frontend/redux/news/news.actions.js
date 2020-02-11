import { newsActionTypes } from "./news.types";
import axios from "axios";

export const getArticles = () => {
  return dispatch => {
    return axios.get("/api/internal/articles").then(({ data }) => {
      dispatch({ type: newsActionTypes.GET_ARTICLES, payload: data.data });
    });
  };
};
