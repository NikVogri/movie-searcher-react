import React from "react";
import ContentDetails from "../../Components/Details/Details";
import ContentCast from "../../Components/Cast/Cast";
import Reviews from "../../Components/Reviews/Reviews";
import Similar from "../../Components/Similar/Similar";
import { useParams } from "react-router-dom";
const Detail = () => {
  const params = useParams();
  const contentId = params.id;
  const type = params.type;
  if (params && contentId && type) {
    return (
      <div>
        <ContentDetails contentId={contentId} type={type} />
        <ContentCast contentId={contentId} type={type} />
        <Reviews contentId={contentId} type={type} />
        <Similar contentId={contentId} type={type} />
      </div>
    );
  } else {
    return null;
  }
};

export default Detail;
