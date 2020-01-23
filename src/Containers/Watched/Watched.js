import React from 'react';
import classes from './Watched.module.css';
import Item from '../../Components/Item/Item';
import useStorage from '../../Hooks/useStorage';
import Spinner from '../../Components/Spinner/Spinner';

const Watched = () => {
  let renderWatched;
  const data = useStorage();

  if (data.length >= 1) {
    renderWatched = data.map(watched => <Item type={watched.name ? 'tv' : 'movie'} key={watched.id} id={watched.id} title={watched.title ? watched.title : watched.name} image={watched.poster_path} voteAverage={watched.vote_average} votes={watched.vote_count} popularity={watched.popularity} description={watched.overview} releaseDate={watched.release_date || watched.first_air_date} />)
  } else if (data.length === 0) {
    renderWatched = <p className={classes.Message}>No watched content added yet. Click on the eye icon to add to watched!</p>
  } else {
    renderWatched = <Spinner />
  }
  return (
    <div className={classes.WatchedWrapper}>
      <h4 className={classes.Title}>Watched</h4>
      <div className={classes.Watched}>
        {renderWatched}
      </div>
    </div>
  );
}

export default Watched;
