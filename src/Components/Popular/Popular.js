import React from "react";
import classes from "./Popular.module.css";
import Item from "../Item/Item";
import ActorItem from "../../Components/ActorItem/ActorItem";
const Popular = ({ topList, numberToDisplay, type }) => {
  const content = topList.slice(0, numberToDisplay);
  let render;
  if (type === "person") {
    render = content.map(person => (
      <ActorItem
        key={person.id}
        id={person.id}
        name={person.name}
        image={person.profile_path}
        knownFor={person.known_for}
        // voteAverage={movie.vote_average}
        // votes={movie.vote_count}
        // popularity={movie.popularity}
        // description={movie.overview}
        // releaseDate={movie.release_date}
      />
    ));
  } else {
    render = content.map(content => (
      <Item
        type={content.title ? "movie" : "tv"}
        key={content.id}
        id={content.id}
        title={content.title || content.name}
        image={content.poster_path}
        // voteAverage={movie.vote_average}
        // votes={movie.vote_count}
        // popularity={movie.popularity}
        // description={movie.overview}
        // releaseDate={movie.release_date}
      />
    ));
  }
  return <div className={classes.TopContainer}>{render}</div>;
};

export default Popular;
