import React from 'react';
import classes from './Popular.module.css';
import Item from '../Item/Item';

const Popular = (props) => {
  const renderTopMovies = props.movieTopList.map(
    movie => <Item key={movie.id} title={movie.title} image={movie.poster_path} voteAverage={movie.vote_average} votes={movie.vote_count} popularity={movie.popularity} description={movie.overview} releaseDate={movie.release_date} />
  );
  return (
    <div className={classes.TopContainer}>
      {renderTopMovies}
    </div>
  );
}

export default Popular;
