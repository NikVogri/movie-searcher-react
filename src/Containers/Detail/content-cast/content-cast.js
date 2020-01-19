import React from 'react';
import classes from './content-cast.module.css';
import Actor from './actor/actor';
const contentCast = () => {
  return (
    <div className={classes.ContentCast}>
      <div className='container'>
        <div className={classes.TopCast}>
          <h2>Cast</h2>
          <div className={classes.CastContainer}>
            <Actor />
            <Actor />
            <Actor />
            <Actor />
            <Actor />
          </div>
        </div>
      </div>
    </div>
  );
}

export default contentCast;
