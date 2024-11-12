import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk } from '../../redux/eventsSlice';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Header.module.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);

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
        <Link to="/cart" className={styles.cart}>
          <span className={styles.cartIcon}>🛒</span>
          {cartItems.length > 0 && (
            <span className={styles.cartBadge}>{cartItems.length}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;