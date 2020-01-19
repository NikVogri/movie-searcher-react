import React, { useEffect, useState } from 'react';
import classes from './similar.module.css';
import SimilarContent from './similar-content/similar-content';
import axios from 'axios';
const Similar = (props) => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await axios.get(
        `https://api.themoviedb.org/3/movie/${props.contentId}/similar?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US&page=1`)
        .then(res => setAboutData(res.data.results.slice(0, 5)));
    }
    getData();
  }, [props.contentId]);

  let render;
  if (aboutData && aboutData.length !== 0) {
    render = aboutData.map(similar => <SimilarContent key={similar.id}{...similar} />)
  } else {
    render = <p>No similar content found</p>;
  }

  return (
    <div className={classes.Similar}>
      <div className='container'>
        <div className={classes.SimilarContent}>
          <h2>Similar</h2>
          <div className={classes.SimilarContentContainer}>
            {render}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Similar;
