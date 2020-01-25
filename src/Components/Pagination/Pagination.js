import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ page, pageNumber, clickHandler }) => {
  return (
    <div
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
