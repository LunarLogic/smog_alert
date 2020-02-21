import thunkMiddleware from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";

import {
  getArticles,
  getArticle,
  resetArticle
} from "../../../redux/news/news.actions";
import { newsActionTypes } from "../../../redux/news/news.types";
import articleMock from "../../__mocks__/articleMock.json";
import articlesMock from "../../__mocks__/articlesMock.json";

const mockStore = configureMockStore([thunkMiddleware]);
const mockAdapter = new MockAdapter(axios);

describe("News actions", () => {
  it("handles requesting article overviews from API", async () => {
    mockAdapter.onGet("/api/internal/articles").reply(200, articlesMock);

    const expectedAction = [
      { type: newsActionTypes.GET_ARTICLES_PENDING },
      {
        type: newsActionTypes.GET_ARTICLES_SUCCESS,
        payload: articlesMock.data
      }
    ];

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    await store.dispatch(getArticles()).then(() => {
      expect(action).toEqual(expectedAction);
    });
  });
  it("handles error response from article overviews API", async () => {
    const response = { status: 404 };
    mockAdapter.onGet("/api/internal/articles").reply(404, response);

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    await store.dispatch(getArticles()).then(() => {
      expect(action[1]).toEqual(expect.any(Object));
    });
  });
  it("handles requesting single article from API", async () => {
    mockAdapter.onGet("/api/internal/articles/13").reply(200, articleMock);

    const expectedAction = [
      { type: newsActionTypes.GET_ARTICLE_PENDING },
      {
        type: newsActionTypes.GET_ARTICLE_SUCCESS,
        payload: articleMock.data
      }
    ];

    const store = mockStore({ payload: {} });
    const action = store.getActions();

    await store.dispatch(getArticle(13)).then(() => {
      expect(action).toEqual(expectedAction);
    });
  });
  it("handles resetting article object in store", () => {
    const expectedAction = {
      type: newsActionTypes.RESET_ARTICLE
    };
    expect(resetArticle()).toEqual(expectedAction);
  });
});
