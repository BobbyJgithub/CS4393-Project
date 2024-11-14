
import React from 'react';
import styles from '../../pages/EventDetails/EventDetails.module.css';

const HeroSection = ({ event }) => (
  <div className={styles["hero-section"]}>
    <img 
      src={event.images?.find(img => img.ratio === "16_9")?.url || event.images?.[0]?.url} 
      alt={event.name} 
      className={styles["hero-image"]}
    />
    <div className={styles["hero-content"]}>
      <h1>{event.name}</h1>
      {event.dates?.start && (
        <h2>{new Date(event.dates.start.dateTime).toLocaleString()}</h2>
      )}
    </div>
  </div>
);

export default HeroSection;