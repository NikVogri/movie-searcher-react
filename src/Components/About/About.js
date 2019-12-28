import React from 'react';
import classes from './About.module.css';

const About = () => {
  return (
    <div className={classes.About}>
      <div className={classes.InnerAbout}>
        <div>
          <h4>Why does this page even exist?</h4>
          <p>This project is created for educational purposes only.</p>
          <h4>Which technology was used to make this website?</h4>
          <p>I used react, react hooks, axios for fetching data, react router dom, The MovieDB API - I strongly recommend it.</p>
          <h4>Contact</h4>
        </div>
        <form className={classes.AboutForm}>
          <label>Name</label>
          <input required type="text" placeholder='Name' />
          <label>Email</label>
          <input required type="email" placeholder='Email' />
          <label>Comment</label>
          <textarea required name="comment" placeholder='Comment' rows="3"></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default About;
