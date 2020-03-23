import { newsActionTypes } from "../../../redux/news/news.types";
import newsReducer from "../../../redux/news/news.reducer";
import articlesMock from "../../__mocks__/articlesMock.json";
import articleMock from "../../__mocks__/articleMock.json";

describe("News reducer", () => {
  const initialState = {
    articles: [],
    pagination: {},
    article: {},
    newsLoader: true,
    articleLoader: true,
    error: false,
    errorCode: null,
    articlesPage: null
  };
  it("should return initial state", () => {
    expect(newsReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle GET_ARTICLES_PENDING", () => {
    expect(
      newsReducer(initialState, { type: newsActionTypes.GET_ARTICLES_PENDING })
    ).toEqual({ ...initialState, newsLoader: true, error: false });
  });
  it("should handle GET_ARTICLES_SUCCESS", () => {
    expect(
      newsReducer(initialState, {
        type: newsActionTypes.GET_ARTICLES_SUCCESS,
        payload: articlesMock
      })
    ).toEqual({
      ...initialState,
      newsLoader: false,
      error: false,
      articles: articlesMock.data,
      pagination: articlesMock.meta.pagination
    });
  });
  it("should handle GET_ARTICLES_FAILURE", () => {
    expect(
      newsReducer(initialState, {
        type: newsActionTypes.GET_ARTICLES_FAILURE
      })
    ).toEqual({
      ...initialState,
      newsLoader: false,
      error: true
    });
  });
  it("should handle GET_ARTICLE_PENDING", () => {
    expect(
      newsReducer(initialState, { type: newsActionTypes.GET_ARTICLE_PENDING })
    ).toEqual({ ...initialState, articleLoader: true, error: false });
  });
  it("should handle GET_ARTICLE_SUCCESS", () => {
    expect(
      newsReducer(initialState, {
        type: newsActionTypes.GET_ARTICLE_SUCCESS,
        payload: articleMock.data
      })
    ).toEqual({
      ...initialState,
      articleLoader: false,
      error: false,
      article: articleMock.data
    });
  });
  it("should handle GET_ARTICLE_FAILURE", () => {
    expect(
      newsReducer(initialState, {
        type: newsActionTypes.GET_ARTICLE_FAILURE,
        payload: { status: 404 }
      })
    ).toEqual({
      ...initialState,
      articleLoader: false,
      error: true,
      errorCode: 404
    });
  });
  it("should handle RESET_ARTICLE", () => {
    expect(
      newsReducer(initialState, { type: newsActionTypes.RESET_ARTICLE })
    ).toEqual({ ...initialState, article: {}, newsLoader: true });
  });
});
