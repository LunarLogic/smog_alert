import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../../redux/news/news.actions";
import { createStructuredSelector } from "reselect";
import {
  selectArticles,
  selectNewsLoader,
  selectNewsError
} from "../../redux/news/news.selectors";
import { PropTypes } from "prop-types";
import { animateScroll } from "react-scroll";
import ImportContactsIcon from "@material-ui/icons/ImportContacts";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import {
  ArticleOverview,
  Loader,
  PageTitle,
  NoItemFound,
  Pagination
} from "../../components";

import "./News.scss";

export const News = ({ match, getArticles, articles, loader, error }) => {
  const { pageId } = match.params;
  const { path, url } = match;
  const redirectPath = path.split(":").shift();

  useEffect(() => {
    getArticles(pageId);
    animateScroll.scrollToTop();
  }, [pageId]);

  const displayArticles = () => {
    if (loader) {
      return <Loader className="news__loader" loaderStyles={loaderStyles} />;
    }

    if (error) {
      return (
        <NoItemFound
          image={<ErrorOutlineIcon />}
          text="Przepraszamy, wystąpił błąd. Prosimy spróbować później."
          linkTo={{ href: "/", text: "Powrót na stronę główną" }}
        />
      );
    }

    return articles.length ? (
      <div className="news">
        <PageTitle title="Aktualności" />
        <div className="news__heading">Aktualności</div>
        {articles.map(article => {
          return (
            <ArticleOverview
              key={article.id}
              title={article.title}
              image={article.image}
              overview={article.overview}
              publishingDate={article.published_at}
              updatingDate={article.updated_at}
              url={url}
              id={article.id}
            />
          );
        })}
        <div className="news__pagination">
          <Pagination redirectPath={redirectPath} />
        </div>
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

  return displayArticles();
};

News.propTypes = {
  getArticles: PropTypes.func,
  articles: PropTypes.array,
  match: PropTypes.object,
  loader: PropTypes.bool,
  error: PropTypes.bool
};

const mapDispatchToProps = dispatch => ({
  getArticles: pageId => dispatch(getArticles(pageId))
});

const mapStateToProps = createStructuredSelector({
  articles: selectArticles,
  loader: selectNewsLoader,
  error: selectNewsError
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
