import React, { useState } from 'react';
import classes from './About.module.css';

const About = () => {
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [body, setbody] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .catch(error => alert(error));
  };

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
        <form className={classes.AboutForm} name="contact" method="post" data-netlify="true" onSubmit={(e) => handleSubmit(e)}>
          <input type="hidden" name="bot-field" />
          <input type="hidden" name="contact" value="contact" />
          <label>Name</label>
          <input required type="text" name="name" placeholder='Name' onChange={(e) => setname(e.target.value)} />
          <label>Email</label>
          <input required type="email" name="email" placeholder='Email' onChange={(e) => setemail(e.target.value)} />
          <label>Comment</label>
          <textarea required name="comment" name="body" placeholder='Comment' rows="3" onChange={(e) => setbody(e.target.value)}></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default About;
