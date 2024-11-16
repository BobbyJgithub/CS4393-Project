import React from 'react';
import styles from './TicketSelector.module.css';

const Total = ({ price, quantity, handleAddToCart, isLoggedIn }) => (
  <div className={styles.total}>
    <h4>Total: ${price * quantity}</h4>
    <button 
      onClick={handleAddToCart} 
      className={styles.addToCartButton}
    >
      {isLoggedIn ? 'Add to Cart' : 'Login to Purchase'}
    </button>
  </div>
);

export default Total;