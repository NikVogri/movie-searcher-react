import React, { useEffect } from 'react';
import ContentDetails from './content-details/content-details';
import ContentCast from './content-cast/content-cast';
import Reviews from './reviews/reviews';
import Similar from './similar/similar';

const Detail = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props]);
  return (
    <div>
      <ContentDetails contentId={props.match.params.id} />
      <ContentCast contentId={props.match.params.id} />
      <Reviews contentId={props.match.params.id} />
      <Similar contentId={props.match.params.id} />
    </div>
  );
}

export default Detail;
