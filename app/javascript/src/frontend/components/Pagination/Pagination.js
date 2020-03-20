import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectPagination } from "../../redux/news/news.selectors";
import { PropTypes } from "prop-types";

import { LinkButton } from "../";

import "./Pagination.scss";

const Pagination = ({ redirectPath, pagination }) => {
  const {
    total_pages,
    prev_page,
    current_page,
    next_page,
    is_first_page,
    is_last_page
  } = pagination;

  const hadleBoxes = () => {
    let boxes;
    if (total_pages > 3) {
      if (total_pages - current_page > 2) {
        boxes = Array.from([0, 1, 2], x => current_page + x);
        boxes.push(total_pages);
      } else {
        boxes = Array.from([2, 1, 0], x => total_pages - x);
      }
    } else {
      boxes = Array.from(Array(total_pages), (x, index) => index + 1);
    }
    return boxes;
  };

  const [boxes, setBoxes] = useState(hadleBoxes());

  useEffect(() => {
    setBoxes(hadleBoxes());
  }, [current_page]);

  const paginationPages = boxes.map((box, idx) => {
    return box === total_pages && boxes[idx - 1] !== total_pages - 1 ? (
      <React.Fragment key={box}>
        <div className={`pagination-box`}>
          <span>...</span>
        </div>
        <LinkButton
          to={`${redirectPath}${box}`}
          className={
            current_page === box
              ? "pagination-box pagination-page"
              : "pagination-box"
          }
        >
          <span>{box}</span>
        </LinkButton>
      </React.Fragment>
    ) : (
      <LinkButton
        key={box}
        to={`${redirectPath}${box}`}
        className={
          current_page === box
            ? "pagination-box pagination-page"
            : "pagination-box"
        }
      >
        <span>{box}</span>
      </LinkButton>
    );
  });

  return (
    <div className="pagination">
      <LinkButton
        to={`${redirectPath}${1}`}
        className="pagination-box"
        disabled={is_first_page}
      >
        <span>«</span>
      </LinkButton>
      <LinkButton
        to={`${redirectPath}${prev_page}`}
        className="pagination-box"
        disabled={is_first_page}
      >
        <span>‹</span>
      </LinkButton>
      {paginationPages}
      <LinkButton
        to={`${redirectPath}${next_page}`}
        className="pagination-box"
        disabled={is_last_page}
      >
        <span>›</span>
      </LinkButton>
      <LinkButton
        to={`${redirectPath}${total_pages}`}
        className="pagination-box"
        disabled={is_last_page}
      >
        <span>»</span>
      </LinkButton>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object,
  url: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  pagination: selectPagination
});

export default connect(mapStateToProps)(Pagination);
