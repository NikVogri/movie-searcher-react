import React from 'react';
import classes from './content-details.module.css';
import MissingPoster from '../../../img/noPoster.jpeg';
import Spinner from '../../../Components/Spinner/Spinner';
import useFetch from '../../../Hooks/useFetch';

const ContentDetails = (props) => {
  const aboutData = useFetch(`/${props.type}/${props.contentId}?api_key=dce6a338a810ffe30be7528d9a32bf13&language=en-US`);
  const externalIdData = useFetch(`/${props.type}/${props.contentId}/external_ids?api_key=dce6a338a810ffe30be7528d9a32bf13`);
  console.log(aboutData.data);
  let render;
  if (aboutData.loading || externalIdData.loading) {
    render = <Spinner style={{height: '100vh'}}/>
  } else if (aboutData.error || externalIdData.error) {
    render = <p className='error-message '>Error fetching data, please refresh the website!</p>
  } else {
    let details;
    if (props.type === 'movie') {
    details = (<><p className='margin-top'>Budget: {aboutData.data.budget ? `$${aboutData.data.budget.toLocaleString()}` : ' /'}</p>
            <p>Revenue: {aboutData.data.revenue ? `$${aboutData.data.revenue.toLocaleString()}` : ' /'}</p>
    {aboutData.data.homepage ? <a href={aboutData.data.homepage} className={classes.Homepage}>Homepage</a> : null} </>);
    } else {
      details = (<><p className='margin-top'>Episodes: {aboutData.data.number_of_episodes }</p>
            <p>Seasons: {aboutData.data.number_of_seasons}</p>
    {aboutData.data.homepage ? <a href={aboutData.data.homepage} className={classes.Homepage}>Homepage</a> : null} </>);
    }
    

    render = (
      <div className='container'>
        <div className={classes.TopDetails}>
          <div className={classes.TopDetailLeft}>
            <img src={aboutData.data.poster_path ? `https://image.tmdb.org/t/p/w500${aboutData.data.poster_path}` : MissingPoster} className={classes.TopDetailImage} alt="movie poster" />
            <p className={classes.Date}>{aboutData.data.release_date ? aboutData.data.release_date.split('-').reverse().join('/') : null || aboutData.data.last_air_date ? aboutData.data.last_air_date.split('-').reverse().join('/') : null }</p>
            <div className={classes.Genre}>
              {aboutData.data.genres ? aboutData.data.genres.slice(0, 3).map(el => <p key={el.id}>{el.name}</p>) : null}
            </div>
            <div className={classes.IconContainer}>
              <a href={`https://www.imdb.com/title/${externalIdData.data.imdb_id}/`} aria-label='imdb'><span className='hideme'>hideme</span><i className="fab fa-imdb margin-top" aria-hidden="true" alt='imdb logo'></i></a>
              <a href={`https://www.facebook.com/${externalIdData.data.facebook_id}/`} aria-label='facebook'><span className='hideme'>hideme</span><i className="fab fa-facebook" aria-hidden="true"></i></a>
              <a href={`https://www.twitter.com/${externalIdData.data.twitter_id}/`} aria-label='twitter'><span className='hideme'>hideme</span><i className="fab fa-twitter" aria-hidden="true"></i></a>
              <a href={`https://www.instagram.com/${externalIdData.data.instagram_id}/`} aria-label='instagram'><span className='hideme'>hideme</span><i className="fab fa-instagram" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className={classes.TopDetailRight}>
            <h2 className={classes.Title} >{aboutData.data.title || aboutData.data.name}</h2>
            <p className={classes.Description}>{aboutData.data.overview}</p>
            <p className='margin-top'>Popularity: {aboutData.data.popularity ? aboutData.data.popularity : '/'}</p>
            <p>Average Rating: {aboutData.data.vote_average}</p>
            <p>Votes: {aboutData.data.vote_count}</p>
            {details}
          </div>
        </div>
      </div>

    )
  }

  return (
    <div className={classes.Detail}>
      {render}
    </div>
  );
}

export default ContentDetails;
