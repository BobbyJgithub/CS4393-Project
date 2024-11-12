// src/pages/EventDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventDetailsThunk } from '../../redux/eventDetailsSlice';
import styles from './EventDetails.module.css';
import TicketSelector from '../../components/TicketSelector/TicketSelector';

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

      <div className={styles["content-grid"]}>
        <div className={styles["main-info"]}>
          {event.description && (
            <section>
              <h3>Description</h3>
              <p>{event.description}</p>
            </section>
          )}

          {event.pleaseNote && (
            <section>
              <h3>Important Notes</h3>
              <p>{event.pleaseNote}</p>
            </section>
          )}

          {event._embedded?.venues?.[0] && (
            <section>
              <h3>Venue Information</h3>
              <h4>{event._embedded.venues[0].name}</h4>
              <p>{event._embedded.venues[0].address?.line1}</p>
              <p>{event._embedded.venues[0].city?.name}, {event._embedded.venues[0].state?.stateCode}</p>
            </section>
          )}

          <section>
            <TicketSelector event={event} />
          </section>
        </div>

        <div className={styles["side-info"]}>
          {event.priceRanges && (
            <section>
              <h3>Price Ranges</h3>
              {event.priceRanges.map((price, index) => (
                <p key={index}>
                  {price.type}: ${price.min} - ${price.max} {price.currency}
                </p>
              ))}
            </section>
          )}

          {event.seatmap?.staticUrl && (
            <section>
              <h3>Seat Map</h3>
              <img 
                src={event.seatmap.staticUrl} 
                alt="Seat Map" 
                className={styles["seatmap"]}
              />
            </section>
          )}

          {event.accessibility && (
            <section>
              <h3>Accessibility</h3>
              <p>{event.accessibility.info}</p>
            </section>
          )}

          {event.ticketLimit && (
            <section>
              <h3>Ticket Limit</h3>
              <p>{event.ticketLimit.info}</p>
            </section>
          )}
        </div>
      </div>

      <div className={styles["cta-section"]}>
        <a 
          href={event.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles["buy-button"]}
        >
          Buy Tickets
        </a>
      </div>
    </div>
  );
}

export default EventDetails;