// src/components/EventCard.js
import React from 'react';
import styles from './EventCard.module.css';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  return (
    <div className={styles['event-card']}>
      <h3>{event.name}</h3>
      {event.dates && <p>{new Date(event.dates.start.dateTime).toLocaleDateString()}</p>}
      {event._embedded && event._embedded.venues && (
        <p>Location: {event._embedded.venues[0].name}</p>
      )}
      <Link to={`/event/${event.id}`}>View Details</Link>
    </div>
  );
}

export default EventCard;