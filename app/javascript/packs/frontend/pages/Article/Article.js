import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { animateScroll } from "react-scroll";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { Loader, PageTitle, NoItemFound } from "../../components";

import { getArticle } from "../../redux/news/news.actions";
import {
  selectArticle,
  selectArticleLoader,
  selectNewsError,
  selectNewsErrorCode
} from "../../redux/redux.selectors";
import { getDate } from "../../helpers";

import "./Article.scss";

import { setCurrentPath } from "../../redux/application/application.actions";

const Article = ({
  match,
  getArticle,
  article,
  loader,
  error,
  setCurrentPath,
  errorCode
}) => {
  const articleId = match.params.articleId;
  const { title, body, published_at, updated_at } = article;
  useEffect(() => {
    setCurrentPath(match.path);
    getArticle(articleId);
    animateScroll.scrollToTop();
  }, []);

  const displayArticle = () => {
    if (loader) {
      return <Loader className="article__loader" loaderStyles={loaderStyles} />;
    }

    if (error) {
      switch (errorCode) {
        case 404:
          return (
            <NoItemFound
              image={<LibraryBooksIcon />}
              text={"Przepraszamy, wybrany artykuł nie istnieje"}
              linkTo={{
                href: "/aktualnosci",
                text: "Powrót do listy aktualności"
              }}
            />
          );
        default:
          return (
            <NoItemFound
              image={<ErrorOutlineIcon />}
              text="Przepraszamy, wystąpił błąd. Prosimy spróbować później."
              linkTo={{ href: "/", text: "Powrót na stronę główną" }}
            />
          );
      }
    }

    if (article) {
      return (
        <div className="article">
          <PageTitle title={title} />
          <div className="article__heading">{title}</div>
          <div className="article__date">
            <div className="article__date-published">
              Opublikowano {getDate(published_at)}
            </div>
            <div className="article__date-updated">
              Uaktualniono {getDate(updated_at)}
            </div>
          </div>
          <div className="article__container">
            <div className="article__container--body">
              {ReactHtmlParser(body)}
            </div>
            <div className="article__container--author">Autor: </div>
          </div>
          <Link className="article__button" to="/aktualnosci">
            <ArrowBackIcon />
            <div className="article__button--text">
              Powrót do listy aktualności
            </div>
          </Link>
        </div>
      );
    }
  };

  const loaderStyles = {
    height: "60vh"
  };

  return displayArticle();
};

const mapDispatchToProps = dispatch => ({
  getArticle: id => dispatch(getArticle(id)),
  setCurrentPath: path => dispatch(setCurrentPath(path))
});

const mapStateToProps = createStructuredSelector({
  article: selectArticle,
  loader: selectArticleLoader,
  error: selectNewsError,
  errorCode: selectNewsErrorCode
});

Article.propTypes = {
  match: PropTypes.object,
  getArticles: PropTypes.func,
  articles: PropTypes.array,
  setCurrentPath: PropTypes.func,
  resetArticle: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
