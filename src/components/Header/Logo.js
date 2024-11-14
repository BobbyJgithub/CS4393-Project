
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Logo = ({ onClick }) => (
  <Link to="/" className={styles.logo} onClick={onClick}>
    TIX
  </Link>
);

export default Logo;