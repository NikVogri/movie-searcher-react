import React, { useEffect, useState } from 'react';
import classes from './content-cast.module.css';
import Actor from './actor/actor';
import axios from 'axios';

const ContentCast = (props) => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await axios.get(
        `https://api.themoviedb.org/3/movie/${props.contentId}/credits?api_key=dce6a338a810ffe30be7528d9a32bf13`)
        .then(res => setAboutData(res.data.cast.slice(0, 10)));
    }
    getData();
  }, [props.contentId]);

  console.log(aboutData);
  return (
    <div className={classes.ContentCast}>
      <div className='container'>
        <div className={classes.TopCast}>
          <h2>Cast</h2>
          <div className={classes.CastContainer}>
            {
              aboutData ? aboutData.map(castMember => <Actor key={castMember.id}{...castMember} />) : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCast;
