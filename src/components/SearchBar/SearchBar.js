// src/components/SearchBar.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const { filters } = useSelector(state => state.filters);

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() || hasActiveFilters) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles['search-bar']}>
      <SearchInput query={query} setQuery={setQuery} />
      <SearchButton />
    </form>
  );
}

export default SearchBar;