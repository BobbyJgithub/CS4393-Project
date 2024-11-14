
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';

const SearchContainer = ({ onSearch }) => (
  <div className={styles['search-container']}>
    <SearchBar onSearch={onSearch} />
    <FilterBar />
  </div>
);

export default SearchContainer;