
import React from 'react';
import styles from './TicketSelector.module.css';

const QuantitySelect = ({ selectedTypeData, quantity, setQuantity }) => (
  <div className={styles.quantitySelect}>
    <label>Quantity:</label>
    <select
      value={quantity}
      onChange={(e) => setQuantity(Number(e.target.value))}
    >
      {[...Array(Math.min(8, selectedTypeData.available))].map((_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>
  </div>
);

export default QuantitySelect;