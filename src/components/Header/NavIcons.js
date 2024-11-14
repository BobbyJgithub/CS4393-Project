
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import styles from './Header.module.css';

const NavIcons = ({ cartItems, isAuthenticated, user, onLoginClick }) => (
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
        onClick={onLoginClick}
      >
        Login
      </button>
    )}
  </div>
);

export default NavIcons;