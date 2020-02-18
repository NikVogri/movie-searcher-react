import React from "react";
import styles from "./ActorItem.module.css";

const ActorItem = ({ name, image, knownFor }) => {
  return (
    <div className={styles.card}>
      <img
        src={`https://image.tmdb.org/t/p/w500${image}`}
        className={styles.personImage}
        alt="person"
      />
      <h3>{name}</h3>
      <span>Known for</span>
      <div className={styles.extra}>
        <ul>
          {knownFor.map(content => (
            <li key={content.id}>{content.title || content.original_name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActorItem;
