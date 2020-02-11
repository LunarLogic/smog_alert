import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import { Loader } from "../../components";

import { getArticles } from "../../redux/news/news.actions";
import { selectArticles } from "../../redux/redux.selectors";
import { getDate } from "../../helpers";

import "./Article.scss";

import { setCurrentPath } from "../../redux/application/application.actions";

const Article = ({ match, getArticles, articles, setCurrentPath }) => {
  const articleId = match.params.articleId;
  let chosenArticle;
  let body;
  useEffect(() => {
    setCurrentPath(match.path);
    getArticles();
  }, []);

  //Temporary solution, waiting for changes in the API
  if (articles.length) {
    chosenArticle = articles.find(item => item.id === Number(articleId));
    body = chosenArticle.body;
  }

  const loaderStyles = {
    height: "75vh"
  };

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
  ) : (
    <Loader className="article__loader" loaderStyles={loaderStyles} />
  );
};

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(getArticles()),
  setCurrentPath: path => dispatch(setCurrentPath(path))
});

const mapStateToProps = createStructuredSelector({
  articles: selectArticles
});

Article.propTypes = {
  match: PropTypes.object,
  getArticles: PropTypes.func,
  articles: PropTypes.array,
  setCurrentPath: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
