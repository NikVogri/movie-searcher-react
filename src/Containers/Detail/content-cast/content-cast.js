import React from 'react';
import classes from './content-cast.module.css';
import Actor from './actor/actor';
import useFetch from '../../../Hooks/useFetch';
import Spinner from '../../../Components/Spinner/Spinner';

const ContentCast = (props) => {
  let render;

  const fetchedData = useFetch(
    `/${props.type}/${props.contentId}/credits?api_key=dce6a338a810ffe30be7528d9a32bf13`,
    null);

  if (fetchedData.data && fetchedData.data.cast.length !== 0) {
    const cast = fetchedData.data.cast.slice(0, 10);
    render = cast.map(castMember => <Actor key={castMember.id}{...castMember} />)
  } else {
    render = <p className='error-message'>No actors or actresses found</p>;
  }
console.log(fetchedData);
  if (fetchedData.error) render = <p className='error-message'>Error loading data, please refresh the page!</p>;
  if (fetchedData.loading) render = <Spinner />

  return (
    <div className={classes.ContentCast}>
      <div className='container'>
        <div className={classes.TopCast}>
          <h2>Cast</h2>
          <div className={classes.CastContainer}>
            {render}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCast;
