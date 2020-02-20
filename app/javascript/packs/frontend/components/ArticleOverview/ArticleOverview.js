import React from "react";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { getDate } from "../../helpers";

import "./ArticleOverview.scss";

const ArticleOverview = ({ title, body, publishingDate, updatingDate, id }) => {
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
      <div className="article-overview__body">{ReactHtmlParser(body)}</div>
      <Link className="article-overview__button" to={`/aktualnosci/${id}`}>
        <div className="article-overview__button--text">Czytaj więcej</div>
        <ArrowForwardIcon />
      </Link>
    </div>
  );
};

ArticleOverview.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  publishingDate: PropTypes.string,
  updatingDate: PropTypes.string,
  id: PropTypes.string
};

export default ArticleOverview;