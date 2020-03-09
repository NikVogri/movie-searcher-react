import React, { useEffect } from "react";
import ContentDetails from "../../Components/Details/Details";
import ContentCast from "../../Components/Cast/Cast";
import Reviews from "../../Components/Reviews/Reviews";
import Similar from "../../Components/Similar/Similar";
import { getHistory, useParams } from "react-router-dom";
const Detail = props => {
  // scrolls to top on prop change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props]);
  const params = useParams();
  const contentId = params.id;
  const type = params.type;
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
