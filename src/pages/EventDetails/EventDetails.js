// src/pages/EventDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventDetailsThunk } from '../../redux/eventDetailsSlice';
import styles from './EventDetails.module.css';

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, isLoading, hasError } = useSelector((state) => state.eventDetails);

  useEffect(() => {
    dispatch(fetchEventDetailsThunk(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading event details...</p>;
  if (hasError) return <p>Failed to load event details.</p>;

  if (!event) return null;

  return (
    <div className={styles["event-details"]}>
      <h1>{event.name}</h1>
      <p>{event.info}</p>
      {event.dates && <p>Date: {new Date(event.dates.start.dateTime).toLocaleString()}</p>}
      {event._embedded && event._embedded.venues && (
        <p>Venue: {event._embedded.venues[0].name}</p>
      )}
      <a href={event.url} target="_blank" rel="noopener noreferrer">Buy Tickets</a>
    </div>
  );
}

export default EventDetails;