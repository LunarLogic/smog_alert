import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectPagination } from "../../redux/news/news.selectors";
import { PropTypes } from "prop-types";

import { LinkButton } from "../";

import "./Pagination.scss";

const Pagination = ({ pagination }) => {
  const {
    total_pages,
    prev_page,
    current_page,
    next_page,
    is_first_page,
    is_last_page
  } = pagination;

  const [pagesArray, setPagesArray] = useState(
    Array.from(Array(total_pages), (x, index) => index + 1)
  );

  useEffect(() => {
    if (current_page !== total_pages) {
      if (total_pages > 3) {
        if (total_pages - current_page > 2) {
          setPagesArray(Array.from([0, 1, 2], x => current_page + x));
        } else {
          setPagesArray(Array.from([3, 2, 1], x => total_pages - x));
        }
      } else {
        setPagesArray(Array.from(Array(total_pages), (x, index) => index + 1));
      }
    }
  }, [current_page]);

  return (
    <div className="pagination">
      <LinkButton
        to={`/aktualnosci/${1}`}
        className="pagination-box"
        disabled={is_first_page}
      >
        <span>«</span>
      </LinkButton>
      <LinkButton
        to={`/aktualnosci/${prev_page}`}
        className="pagination-box"
        disabled={is_first_page}
      >
        <span>‹</span>
      </LinkButton>
      {pagesArray.map(page => (
        <LinkButton
          key={page}
          to={`/aktualnosci/${page}`}
          className={
            current_page === page
              ? "pagination-box pagination-page"
              : "pagination-box"
          }
        >
          <span>{page}</span>
        </LinkButton>
      ))}
      {total_pages > 3 && (
        <>
          {pagesArray[pagesArray.length - 1] !== total_pages - 1 && (
            <div className={`pagination-box`}>
              <span>...</span>
            </div>
          )}
          <LinkButton
            to={`/aktualnosci/${total_pages}`}
            className={
              current_page === total_pages
                ? "pagination-box pagination-page"
                : "pagination-box"
            }
          >
            <span>{total_pages}</span>
          </LinkButton>
        </>
      )}
      <LinkButton
        to={`/aktualnosci/${next_page}`}
        className="pagination-box"
        disabled={is_last_page}
      >
        <span>›</span>
      </LinkButton>
      <LinkButton
        to={`/aktualnosci/${total_pages}`}
        className="pagination-box"
        disabled={is_last_page}
      >
        <span>»</span>
      </LinkButton>
    </div>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  pagination: selectPagination
});

export default connect(mapStateToProps)(Pagination);
