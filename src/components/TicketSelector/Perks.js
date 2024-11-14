
import React from 'react';
import styles from './TicketSelector.module.css';

const Perks = ({ perks }) => (
  <div className={styles.perks}>
    <h4>Included Perks:</h4>
    <ul>
      {perks.map((perk, index) => (
        <li key={index}>{perk}</li>
      ))}
    </ul>
  </div>
);

export default Perks;