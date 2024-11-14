
import React from 'react';
import styles from './SearchBar.module.css';

const SearchButton = () => (
  <button type="submit" className={styles['search-bar__button']}>
    Search
  </button>
);

export default SearchButton;