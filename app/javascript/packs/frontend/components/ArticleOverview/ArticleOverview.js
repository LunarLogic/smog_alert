import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { getDate } from "../../helpers";

import "./ArticleOverview.scss";
import { ArticleOverviewImage } from "./ArticleOverview.styles.jsx";
import { resetArticle } from "../../redux/news/news.actions";

export const ArticleOverview = ({
  title,
  image,
  overview,
  publishingDate,
  updatingDate,
  id,
  resetArticle
}) => {
  return (
    <div className="article-overview">
      <div className="article-overview__title">{title}</div>
      <div className="article-overview__date">
        <div className="article-overview__date-published">
          Opublikowano {getDate(publishingDate)}
        </div>
        <div className="article-overview__date-updated">
          Uaktualniono {getDate(updatingDate)}
        </div>
      </div>
      <div className="article-overview__container">
        {image ? <ArticleOverviewImage image={image} /> : null}
        <div className="article-overview__container--overview">
          <div className="article-overview__container--overview-text">
            {overview}
          </div>
          <Link
            className="article-overview__container--button"
            to={`/aktualnosci/${id}`}
            onClick={resetArticle}
          >
            <div className="article-overview__container--button-text">
              Czytaj więcej
            </div>
            <ArrowForwardIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  resetArticle: () => dispatch(resetArticle())
});

ArticleOverview.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  overview: PropTypes.string,
  publishingDate: PropTypes.string,
  updatingDate: PropTypes.string,
  id: PropTypes.number,
  resetArticle: PropTypes.func
};

export default connect(null, mapDispatchToProps)(ArticleOverview);
