import React, { useEffect } from "react";
import ContentDetails from "./content-details/content-details";
import ContentCast from "./content-cast/content-cast";
import Reviews from "./reviews/reviews";
import Similar from "./similar/similar";

const Detail = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props]);
  const contentId = props.match.params.id;
  const type = props.match.params.type;
  return (
    <div>
      <ContentDetails contentId={contentId} type={type} />
      <ContentCast contentId={contentId} type={type} />
      <Reviews contentId={contentId} type={type} />
      <Similar contentId={contentId} type={type} />
    </div>
  );
};

export default Detail;
