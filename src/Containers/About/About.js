import React from 'react';
import classes from './About.module.css';
const About = () => {


  return (
    <div className={classes.About}>
      <div className={classes.InnerAbout}>
        <div>
          <h3 style={{fontSize: '33px', marginTop: '15px', textAlign: 'center' }}>Film<span style={{ color: 'red'}}>etor</span></h3>
          <h4>Which API does this site use?</h4>
          <p>This site uses <a href='https://www.themoviedb.org/'>MovieDB API.</a> I strongly recommend it.</p>
          <h4>Technology used in this project</h4>
          <p>I used react, react hooks & custom hooks, axios, react router dom & show-more-text component.</p>
          <h4>Contact</h4>
          <p> If you have any questions or any complaints, please contact me by clicking <a href='mailto:vogrinec.nik@gmail.com'>here</a></p>
        </div>
      </div>
    </div>
  );
}

export default About;
