
import React from 'react';
import styles from './TicketSelector.module.css';

const Total = ({ price, quantity, handleAddToCart }) => (
  <div className={styles.total}>
    <p>Total: ${price * quantity}</p>
    <button onClick={handleAddToCart}>Add to Cart</button>
  </div>
);

export default Total;