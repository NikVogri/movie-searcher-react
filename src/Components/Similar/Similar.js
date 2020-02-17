import React from "react";
import classes from "./similar.module.css";
import SimilarContent from "./similar-content/similar-content";
import useFetch from "../../Hooks/useFetch";

const Similar = ({ type, contentId }) => {
  const aboutData = useFetch(
    `/${type}/${contentId}/recommendations?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US&page=1`
  );
  let render;
  // checks if all content is fetched
  if (aboutData.data && aboutData.data.length !== 0) {
    const similarContent = aboutData.data.results.slice(0, 5);
    render = similarContent.map(similar => (
      <SimilarContent type={type} key={similar.id} {...similar} />
    ));
    if (aboutData.data.results.length === 0) {
      render = <p className="error-message">No similar content found</p>;
    }
  }

  if (aboutData.error)
    render = (
      <p className="error-message">
        Error loading data, please refresh the page!
      </p>
    );

  return (
    <div className={classes.Similar}>
      <div className="container">
        <div className={classes.SimilarContent}>
          <h2>Similar</h2>
          <div className={classes.SimilarContentContainer}>{render}</div>
        </div>
      </div>
    </div>
  );
};

export default Similar;
