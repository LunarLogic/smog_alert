import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../../redux/news/news.actions";
import { createStructuredSelector } from "reselect";
import { selectArticles } from "../../redux/redux.selectors";
import { PropTypes } from "prop-types";
import { animateScroll } from "react-scroll";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";

import {
  ArticleOverview,
  Loader,
  PageTitle,
  NoItemFound
} from "../../components";

import "./News.scss";

import { setCurrentPath } from "../../redux/application/application.actions";

const News = ({ match, getArticles, articles, setCurrentPath }) => {
  useEffect(() => {
    setCurrentPath(match.path);
    getArticles();
    animateScroll.scrollToTop();
  }, []);
  let sortedArticles;

  const displayArticles = articles => {
    if (articles.length) {
      sortedArticles = articles.sort((a, b) =>
        b.updated_at > a.updated_at ? 1 : -1
      );
    }

    return articles.length ? (
      <div className="news">
        <PageTitle title="Aktualności" />
        <div className="news__heading">Aktualności</div>
        {sortedArticles.map(article => {
          return (
            <ArticleOverview
              key={article.id}
              title={article.title}
              image={article.image}
              overview={article.overview}
              publishingDate={article.published_at}
              updatingDate={article.updated_at}
              id={article.id}
            />
          );
        })}
      </div>
    ) : (
      <NoItemFound
        image={<ImportContactsIcon />}
        text="Brak artykułów do wyświetlenia"
        linkTo={{ href: "/", text: "Powrót na stronę główną" }}
      />
    );
  };

  const loaderStyles = {
    height: "60vh"
  };

  return articles ? (
    displayArticles(articles)
  ) : (
    <Loader className="news__loader" loaderStyles={loaderStyles} />
  );
};

News.propTypes = {
  getArticles: PropTypes.func,
  articles: PropTypes.array,
  setCurrentPath: PropTypes.func,
  match: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  getArticles: () => dispatch(getArticles()),
  setCurrentPath: path => dispatch(setCurrentPath(path))
});

const mapStateToProps = createStructuredSelector({
  articles: selectArticles
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
