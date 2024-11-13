import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk, clearSearchResults } from '../../redux/slices/eventsSlice';
import SearchBar from '../SearchBar/SearchBar';
import AuthModal from '../AuthModal/AuthModal';
import FilterBar from '../FilterBar/FilterBar';
import { ShoppingCart, User } from 'lucide-react';
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
          <FilterBar />
        </div>
        <div className={styles.navIcons}>
          <Link to="/cart" className={styles.cart}>
            <ShoppingCart className={styles.cartIcon} />
            {cartItems.length > 0 && (
              <span className={styles.cartBadge}>{cartItems.length}</span>
            )}
          </Link>
          {isAuthenticated ? (
            <Link to="/profile" className={styles.profileIcon}>
              <User className={styles.userIcon} /> {user.username}
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
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
}

export default Header;