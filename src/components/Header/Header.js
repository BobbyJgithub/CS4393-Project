
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchEventsThunk } from '../../redux/eventsSlice';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    dispatch(fetchEventsThunk(query));
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          TIX
        </Link>
        <div className={styles['search-container']}>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
    </header>
  );
}

export default Header;