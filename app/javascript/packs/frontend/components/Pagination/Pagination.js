import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getArticles } from "../../redux/news/news.actions";
import { createStructuredSelector } from "reselect";
import { selectPagination } from "../../redux/news/news.selectors";
import { PropTypes } from "prop-types";

import "./Pagination.scss";

const Pagination = ({ getArticles, pagination }) => {
  const {
    total_pages,
    prev_page,
    current_page,
    next_page,
    is_first_page,
    is_last_page
  } = pagination;

  const [updatePagination, setUpdatePagination] = useState(true);
  const [pagesArray, setPagesArray] = useState(
    Array.from(Array(total_pages), (x, index) => index + 1)
  );

  useEffect(() => {
    if (updatePagination && current_page !== total_pages) {
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
  }, [current_page, updatePagination]);

  const handleNext = () => {
    setUpdatePagination(true);
    if (is_last_page !== true) {
      getArticles(next_page);
    }
  };
  const handlePrevious = () => {
    setUpdatePagination(true);
    if (is_first_page !== true) {
      getArticles(prev_page);
    }
  };
  const handleLast = () => {
    setUpdatePagination(true);
    if (is_last_page !== true) {
      getArticles(total_pages);
    }
  };
  const handleFirst = () => {
    setUpdatePagination(true);
    if (is_first_page !== true) {
      getArticles(1);
    }
  };

  const handleChosenPage = page => {
    setUpdatePagination(false);
    getArticles(page);
  };

  return (
    <div className="pagination">
      <button
        disabled={is_first_page}
        className="pagination-box"
        onClick={handleFirst}
      >
        <span>«</span>
      </button>
      <button
        disabled={is_first_page}
        className="pagination-box"
        onClick={handlePrevious}
      >
        <span>‹</span>
      </button>
      {pagesArray.map(page => (
        <div
          key={page}
          className={
            current_page === page
              ? "pagination-box pagination-page"
              : "pagination-box"
          }
          onClick={() => {
            setUpdatePagination(true);
            handleChosenPage(page);
          }}
        >
          <span>{page}</span>
        </div>
      ))}
      {total_pages > 3 && (
        <>
          {pagesArray[pagesArray.length - 1] !== total_pages - 1 && (
            <div className={`pagination-box`}>
              <span>...</span>
            </div>
          )}
          <div
            className={
              current_page === total_pages
                ? "pagination-box pagination-page"
                : "pagination-box"
            }
            onClick={() => handleChosenPage(total_pages)}
          >
            <span>{total_pages}</span>
          </div>
        </>
      )}
      <button
        disabled={is_last_page}
        className="pagination-box"
        onClick={() => {
          setUpdatePagination(true);
          handleNext();
        }}
      >
        <span>›</span>
      </button>
      <button
        disabled={is_last_page}
        className="pagination-box"
        onClick={handleLast}
      >
        <span>»</span>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  getArticles: PropTypes.func,
  pagination: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  pagination: selectPagination
});

export default connect(mapStateToProps, { getArticles })(Pagination);
