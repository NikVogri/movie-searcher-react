import React, { useEffect, useState } from 'react';
import classes from './content-details.module.css';
import axios from 'axios';
import MissingPoster from '../../../img/noPoster.jpeg';

const ContentDetails = (props) => {
  const [aboutData, setAboutData] = useState({});
  const [externalIdData, setExternalIdData] = useState({});

  useEffect(() => {
    const getData = async () => {
      await axios.get(
        `https://api.themoviedb.org/3/movie/${props.contentId}?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US`)
        .then(res => setAboutData(res.data));
    }
    const getExternalIds = async () => {
      await axios.get(
        `https://api.themoviedb.org/3/movie/${props.contentId}/external_ids?api_key=dce6a338a810ffe30be7528d9a32bf13`)
        .then(res => setExternalIdData(res.data));
    }
    getData();
    getExternalIds();
  }, [props.contentId]);
  return (
    <div className={classes.Detail}>
      <div className='container'>
        <div className={classes.TopDetails}>
          <div className={classes.TopDetailLeft}>
            <img src={aboutData.poster_path ? `https://image.tmdb.org/t/p/w500${aboutData.poster_path}` : MissingPoster} className={classes.TopDetailImage} alt="movie poster" />
            <p className={classes.Date}>{aboutData.release_date ? aboutData.release_date.split('-').reverse().join('/') : null}</p>
            <div className={classes.Genre}>
              {aboutData.genres ? aboutData.genres.slice(0, 3).map(el => <p key={el.id}>{el.name}</p>) : null}
            </div>
            <div className={classes.IconContainer}>
              <a href={`https://www.imdb.com/title/${externalIdData.imdb_id}/`} aria-label='imdb'><span className='hideme'>hideme</span><i className="fab fa-imdb margin-top" aria-hidden="true" alt='imdb logo'></i></a>
              <a href={`https://www.facebook.com/${externalIdData.facebook_id}/`} aria-label='facebook'><span className='hideme'>hideme</span><i className="fab fa-facebook" aria-hidden="true"></i></a>
              <a href={`https://www.twitter.com/${externalIdData.twitter_id}/`} aria-label='twitter'><span className='hideme'>hideme</span><i className="fab fa-twitter" aria-hidden="true"></i></a>
              <a href={`https://www.instagram.com/${externalIdData.instagram_id}/`} aria-label='instagram'><span className='hideme'>hideme</span><i className="fab fa-instagram" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className={classes.TopDetailRight}>
            <h2 className={classes.Title} >{aboutData.title}</h2>
            <p className={classes.Description}>{aboutData.overview}</p>
            <p className='margin-top'>Popularity: {aboutData.popularity ? aboutData.popularity : '/'}</p>
            <p>Average Rating: {aboutData.vote_average}</p>
            <p>Votes: {aboutData.vote_count}</p>
            <p className='margin-top'>Budget: {aboutData.budget ? `$${aboutData.budget.toLocaleString()}` : '/'}</p>
            <p>Ravenue: {aboutData.revenue ? `$${aboutData.revenue.toLocaleString()}` : '/'}</p>
            {
              aboutData.homepage ? <a href={aboutData.homepage} className={classes.Homepage}>Homepage</a> : null
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDetails;
