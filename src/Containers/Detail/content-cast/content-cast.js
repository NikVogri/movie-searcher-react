import React, {useState} from 'react';
import classes from './content-cast.module.css';
import Actor from './actor/actor';
import useFetch from '../../../Hooks/useFetch';
import Spinner from '../../../Components/Spinner/Spinner';

const ContentCast = (props) => {
  const [viewCastNumber, setViewCastNumber] = useState(10);

  const viewMoreCast = () => {
    if (viewCastNumber === 10) {
      setViewCastNumber(20);
      return
    }
    setViewCastNumber(10);
  };

  let render;
  const fetchedData = useFetch(
    `/${props.type}/${props.contentId}/credits?api_key=dce6a338a810ffe30be7528d9a32bf13`,
    null);

  if (fetchedData.data && fetchedData.data.cast.length !== 0) {
    const cast = fetchedData.data.cast.slice(0, viewCastNumber);
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
            {
            fetchedData.data ? fetchedData.data.cast.length > 10 ? 
            <p onClick={viewMoreCast} className={classes.Expand}>{viewCastNumber === 10 ? `Show more` 
            : `Show less` }</p>
            : null 
            : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCast;
