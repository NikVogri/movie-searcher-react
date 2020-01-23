import React from 'react';
import classes from './Footer.module.css';
import Logo from '../../img/MovieDB_logo.png';

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <img src={Logo} alt='themoviedb logo' className={classes.Image} />
      <p className={classes.Copyright}>Copyright Filmetor by Nik Vogrinec &copy; 2020</p>
    </div >
  );
}

export default Footer;
