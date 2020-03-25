import { createSelector } from "reselect";

const selectNews = state => state.news;

export const selectArticles = createSelector(
  [selectNews],
  news => news.articles
);

export const selectNewsLoader = createSelector(
  [selectNews],
  news => news.newsLoader
);

export const selectArticleLoader = createSelector(
  [selectNews],
  news => news.articleLoader
);

export const selectNewsError = createSelector([selectNews], news => news.error);

export const selectNewsErrorCode = createSelector(
  [selectNews],
  news => news.errorCode
);

export const selectArticle = createSelector([selectNews], news => news.article);

export const selectPagination = createSelector(
  [selectNews],
  news => news.pagination
);

export const selectArticlesPage = createSelector(
  [selectNews],
  news => news.articlesPage
);
