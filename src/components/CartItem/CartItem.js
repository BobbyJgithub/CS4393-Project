
import React from 'react';
import styles from './CartItem.module.css';

const CartItem = ({ item, onRemove }) => (
  <div className={styles.cartItem}>
    <div className={styles.itemInfo}>
      <h3>{item.eventName}</h3>
      <p>{new Date(item.date).toLocaleDateString()}</p>
      <p>{item.type} Ticket - Quantity: {item.quantity}</p>
      <p>Price: ${item.price * item.quantity}</p>
    </div>
    <button onClick={() => onRemove(item.id)}>Remove</button>
  </div>
);

export default CartItem;