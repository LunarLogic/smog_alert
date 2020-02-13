import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { PropTypes } from "prop-types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { animateScroll } from "react-scroll";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

import { Loader, PageTitle, NoItemFound } from "../../components";

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
    animateScroll.scrollToTop();
  }, []);

  //Temporary solution, waiting for changes in the API
  if (articles && articles.length) {
    chosenArticle = articles.find(item => item.id === Number(articleId));
    body = chosenArticle.body;
  }

  const displayArticle = chosenArticle => {
    return chosenArticle ? (
      <div className="article">
        <PageTitle title={chosenArticle.title} />
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
    ) : (
      <NoItemFound
        image={<LibraryBooksIcon />}
        text={"Przepraszamy, wybrany artykuł nie istnieje"}
        linkTo={{ href: "/aktualnosci", text: "Powrót do listy aktualności" }}
      />
    );
  };

  const loaderStyles = {
    height: "60vh"
  };

  return articles ? (
    displayArticle(chosenArticle)
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
