import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk, clearSearchResults } from '../../redux/eventsSlice';
import SearchBar from '../SearchBar/SearchBar';
import AuthModal from '../AuthModal/AuthModal';
import FilterBar from '../FilterBar/FilterBar';
import styles from './Header.module.css';

function Header() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.items);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { type, filters } = useSelector(state => state.filters);

  const handleSearch = (query) => {
    dispatch(fetchEventsThunk({ query, type, filters }));
    navigate('/');
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    dispatch(clearSearchResults());
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} onClick={handleLogoClick}>
          TIX
        </Link>
        <div className={styles['search-container']}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className={styles.navIcons}>
          <Link to="/cart" className={styles.cart}>
            <span className={styles.cartIcon}>🛒</span>
            {cartItems.length > 0 && (
              <span className={styles.cartBadge}>{cartItems.length}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className={styles.profileIcon}>
              <span>👤 {user.username}</span>
            </Link>
          ) : (
            <button 
              className={styles.loginButton}
              onClick={() => setShowAuthModal(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>
      <FilterBar />
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
}

export default Header;