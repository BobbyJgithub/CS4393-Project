
import React from 'react';
import styles from './SearchBar.module.css';

const SearchInput = ({ query, setQuery }) => (
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search for events..."
    className={styles['search-bar__input']}
  />
);

export default SearchInput;