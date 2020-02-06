import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../../redux/news/news.actions";
import { createStructuredSelector } from "reselect";
import { selectArticles } from "../../redux/redux.selectors";
import ReactHtmlParser from "react-html-parser";

import "./News.scss";

const News = ({ getArticles, articles }) => {
  useEffect(() => {
    getArticles();
  }, []);

  return articles.length ? (
    <div>
      <div className="news__heading">Aktualności</div>
      <div>{articles[0].title}</div>
      <div>{ReactHtmlParser(articles[0].body)}</div>
    </div>
  ) : null;
};

const mapStateToProps = createStructuredSelector({
  articles: selectArticles
});

export default connect(mapStateToProps, { getArticles })(News);
