import React, { useEffect, useState } from 'react';
import classes from './content-details.module.css';
import axios from 'axios';
import MissingPoster from '../../../img/noPoster.jpeg';

const ContentDetails = (props) => {
  const [aboutData, setAboutData] = useState({});

  useEffect(() => {
    const getData = async () => {
      await axios.get(
        `https://api.themoviedb.org/3/movie/${props.contentId}?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US`)
        .then(res => setAboutData(res.data));
    }
    getData();
  }, [props.contentId]);

  return (
    <div className={classes.Detail}>
      <div className='container'>
        <div className={classes.TopDetails}>
          <div className={classes.TopDetailLeft}>
            <img src={aboutData.poster_path ? `https://image.tmdb.org/t/p/w500${aboutData.poster_path}` : MissingPoster} className={classes.TopDetailImage} alt="movie poster" />
            <p className={classes.Date}>{aboutData.release_date}</p>
            {aboutData.genres ? aboutData.genres.map(el => <p key={el.id}>{el.name}</p>) : null}
            <div className={classes.IconContainer}>
              <a href='/'><i className="fab fa-imdb margin-top" aria-hidden="true"></i></a>
              <i className="fab fa-facebook" aria-hidden="true"></i>
              <i className="fab fa-twitter" aria-hidden="true"></i>
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </div>
          </div>
          <div className={classes.TopDetailRight}>
            <h2 className={classes.Title}>{aboutData.title}</h2>
            <p className={classes.Description}>{aboutData.overview}</p>
            <p className='margin-top'>Popularity: {aboutData.popularity ? aboutData.popularity : '/'}</p>
            <p>Average Rating: {aboutData.vote_average}</p>
            <p>Votes: {aboutData.vote_count}</p>
            <p className='margin-top'>Budget: ${aboutData.budget ? aboutData.budget : '/'}</p>
            <p>Ravenue: ${aboutData.revenue ? aboutData.revenue : '/'}</p>
            <p>Homepage: {aboutData.homepage ? aboutData.homepage : '/'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDetails;
