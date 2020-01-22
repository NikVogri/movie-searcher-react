import React from 'react';
import classes from './PopularTV.module.css';
import Item from '../../Item/Item';

const PopularTV = (props) => {
  const series = props.tvTopList.slice(0, props.numberToDisplay);
  const renderTopTV = series.map(
    tv => <Item type='tv' key={tv.id} id={tv.id} title={tv.original_name} image={tv.poster_path} voteAverage={tv.vote_average} votes={tv.vote_count} popularity={tv.popularity} description={tv.overview} releaseDate={tv.release_date} />
  );
  return (
    <div className={classes.TopContainer}>
      {renderTopTV}
    </div>
  );
}

export default PopularTV;
