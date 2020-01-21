import React from 'react';
import classes from './similar.module.css';
import SimilarContent from './similar-content/similar-content';
import useFetch from '../../../Hooks/useFetch';
import Spinner from '../../../Components/Spinner/Spinner';

const Similar = (props) => {
  const aboutData = useFetch(`/movie/${props.contentId}/similar?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US&page=1`);
  let render;
  if (aboutData.data && aboutData.data.length !== 0) {
    const similarContent = aboutData.data.results.slice(0, 5);
    render = similarContent.map(similar => <SimilarContent key={similar.id}{...similar} />)
  } else {
    render = <p>No similar content found</p>;
  }

  if (aboutData.error) render = <p>Error loading data, please refresh the page!</p>;
  if (aboutData.loading) render = <Spinner />

  return (
    <div className={classes.Similar}>
      <div className='container'>
        <div className={classes.SimilarContent}>
          <h2>Similar</h2>
          <div className={classes.SimilarContentContainer}>
            {render}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Similar;
