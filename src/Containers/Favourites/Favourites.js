import React from 'react';
import classes from './Favourites.module.css';
import Item from '../../Components/Item/Item';
import useStorage from '../../Hooks/useStorage';

const Favourites = () => {
  let renderFavourites;
  let renderWatched;
  const data = useStorage();

  if (data.favourites || data.watched) {
    renderFavourites = data.favourites.map(fav => <Item type={fav.name ? 'tv' : 'movie'} key={fav.id} id={fav.id} title={fav.title ? fav.title : fav.name} image={fav.poster_path} voteAverage={fav.vote_average} votes={fav.vote_count} popularity={fav.popularity} description={fav.overview} releaseDate={fav.release_date || fav.first_air_date} />)
    renderWatched = data.watched.map(watched => <Item type={watched.name ? 'tv' : 'movie'} key={watched.id} id={watched.id} title={watched.title ? watched.title : watched.name} image={watched.poster_path} voteAverage={watched.vote_average} votes={watched.vote_count} popularity={watched.popularity} description={watched.overview} releaseDate={watched.release_date || watched.first_air_date} />)
  } else {
    renderFavourites = <p>No favourites added yet!</p>
  }
  return (
    <div className={classes.Favourites}>
      <h4>Watched</h4>
      {renderWatched}
      <h4>Favourites</h4>
      {renderFavourites}
    </div>
  );
}

export default Favourites;
