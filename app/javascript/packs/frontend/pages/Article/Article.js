import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { getArticles } from "../../redux/news/news.actions";
import { selectArticles } from "../../redux/redux.selectors";
import { getDate } from "../../helpers/getDate";

import "./Article.scss";

const Article = ({ match, getArticles, articles }) => {
  const articleId = match.params.articleId;
  let chosenArticle;
  let body;
  useEffect(() => {
    getArticles();
  }, []);

  if (articles.length) {
    chosenArticle = articles.find(item => item.id === Number(articleId));
    body = chosenArticle.body;
  }

  return chosenArticle ? (
    <div className="article">
      <div className="article__heading">{chosenArticle.title}</div>
      <div className="article__date">
        <div className="article__date-published">
          Opublikowano {getDate(chosenArticle.published_at)}
        </div>
        <div className="article__date-updated">
          Uaktualniono {getDate(chosenArticle.updated_at)}
        </div>
      </div>
      <div className="article__container">
        <div className="article__container--body">{ReactHtmlParser(body)}</div>
        <div className="article__container--author">Autor: </div>
      </div>
      <a className="article__button" href="/aktualnosci">
        <ArrowBackIcon />
        <div className="article__button--text">Powrót do listy aktualności</div>
      </a>
    </div>
  ) : null;
};

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(getArticles())
});

const mapStateToProps = createStructuredSelector({
  articles: selectArticles
});

Article.propTypes = {
  match: PropTypes.object,
  getArticles: PropTypes.func,
  articles: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
