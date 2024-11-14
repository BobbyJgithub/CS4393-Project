import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk, clearSearchResults } from '../../redux/slices/eventsSlice';
import AuthModal from '../AuthModal/AuthModal';
import Logo from './Logo';
import SearchContainer from './SearchContainer';
import NavIcons from './NavIcons';
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
        <Logo onClick={handleLogoClick} />
        <SearchContainer onSearch={handleSearch} />
        <NavIcons 
          cartItems={cartItems} 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLoginClick={() => setShowAuthModal(true)} 
        />
      </div>
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
}

export default Header;