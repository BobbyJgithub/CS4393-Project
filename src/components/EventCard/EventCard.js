// src/components/EventCard.js
import React from "react";
import styles from "./EventCard.module.css";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const isAttraction = event.type === 'attraction';

  return (
    <div className={styles["event-card"]}>
      <h3>{event.name}</h3>
      {!isAttraction && event._embedded?.attractions?.[0]?.name && (
        <h4>{event._embedded.attractions[0].name}</h4>
      )}
      <img
        src={event.images?.[0]?.url}
        alt={`${event.name} image`}
        className={styles["image"]}
      />
      {!isAttraction && event.dates && (
        <p>{new Date(event.dates.start.dateTime).toLocaleDateString()}</p>
      )}
      {!isAttraction && event._embedded?.venues && (
        <p>Location: {event._embedded.venues[0].name}</p>
      )}
      {isAttraction ? (
        <>
        <p>Type: {event.classifications?.[0]?.segment?.name || 'Attraction'}</p>
        <Link to={`/attraction/${event.id}`}>View Details</Link>
        </>
      ) : (
        <Link to={`/event/${event.id}`}>View Details</Link>
      )}
    </div>
  );
}

export default EventCard;