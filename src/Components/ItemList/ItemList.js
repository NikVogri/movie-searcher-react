import React from "react";
import classes from "./ItemList.module.css";
import Item from "../Item/Item";
import ActorItem from "../ActorItem/ActorItem";

const ItemList = ({ items, numberToDisplay, type }) => {
  const content = items.slice(0, numberToDisplay || 9999);
  let render;
  console.log(content);
  if (type === "person") {
    render = content.map(person => (
      <ActorItem
        key={person.id}
        id={person.id}
        name={person.name}
        image={person.profile_path}
        knownFor={person.known_for}
      />
    ));
  } else if (type === "userFetch") {
    render = content
      .reverse()
      .map(content => (
        <Item
          type={content.contentType}
          key={content.contentId}
          id={content.contentId}
          title={content.name}
          image={content.imagePath}
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
      />
    ));
  }
  return <div className={classes.TopContainer}>{render}</div>;
};

export default ItemList;
