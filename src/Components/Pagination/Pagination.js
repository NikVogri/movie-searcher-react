import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ page, pageNumber, clickHandler }) => {
  return (
    <div
      //depending on page and page number displays active class if they're the same.
      className={`${classes.Pagination} ${
        page === pageNumber ? classes.ActivePage : null
      }`}
      onClick={() => clickHandler()}
    >
      {pageNumber}
    </div>
  );
};

export default Pagination;
