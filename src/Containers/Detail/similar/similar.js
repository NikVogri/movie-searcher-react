import React from 'react';
import classes from './similar.module.css';
import SimilarContent from './similar-content/similar-content';


const Similar = () => {
  return (
    <div className={classes.Similar}>
      <div className='container'>
        <div className={classes.SimilarContent}>
          <h2>Similar</h2>
          <div className={classes.SimilarContentContainer}>
            <SimilarContent />
            <SimilarContent />
            <SimilarContent />
            <SimilarContent />
            <SimilarContent />
            <SimilarContent />
            <SimilarContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Similar;
