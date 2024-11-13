// src/components/SearchBar.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const { filters } = useSelector(state => state.filters);

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Allow search if there's a query OR if there are active filters
    if (query.trim() || hasActiveFilters) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["search-bar"]}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for events..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;