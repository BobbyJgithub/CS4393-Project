import React from 'react';
import EventCard from '../EventCard/EventCard';
import styles from './SearchSection.module.css';

const SearchSection = ({ title, items }) => {
  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.grid}>
        {items.map(item => (
          <EventCard key={item.id} event={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchSection;