import React from 'react';
import classes from './Pagination.module.css';

const Pagination = (props) => {
  return (
    <div className={`${classes.Pagination} ${props.page === props.pageNumber ? classes.ActivePage : null}`} onClick={() => props.clickHandler()}>
      {props.pageNumber}
    </div>
  );
}

export default Pagination;
