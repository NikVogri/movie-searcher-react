import React from 'react';
import classes from './content-details.module.css';
import Image from '../../../img/joker.png';
const ContentDetails = () => {
  return (
    <div className={classes.Detail}>
      <div className='container'>
        <div className={classes.TopDetails}>
          <div className={classes.TopDetailLeft}>
            <img src={Image} className={classes.TopDetailImage} alt="movie image" />
            <p className={classes.Date}>12/12/1948</p>
            <p>Crime | Thriller | Drama</p>
            <div className={classes.IconContainer}>
              <i className="fab fa-imdb margin-top" aria-hidden="true"></i>
              <i className="fab fa-facebook" aria-hidden="true"></i>
              <i className="fab fa-twitter" aria-hidden="true"></i>
              <i className="fab fa-instagram" aria-hidden="true"></i>
            </div>
          </div>
          <div className={classes.TopDetailRight}>
            <h2 className={classes.Title}>Joker</h2>
            <p className={classes.Description}>During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.</p>
            <p className='margin-top'>Popularity: 226.101</p>
            <p>Average Rating: 8.3</p>
            <p>Votes: 7991</p>
            <p className='margin-top'>Budget: $55.000.000</p>
            <p>Ravenue: $1.060.753.468</p>
            <p>Homepage: https://www.jokermovie.net</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDetails;
