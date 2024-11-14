
import React from 'react';
import styles from '../../pages/EventDetails/EventDetails.module.css';

const SideInfo = ({ event }) => (
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
    {event.ticketLimit && (
      <section>
        <h3>Ticket Limit</h3>
        <p>{event.ticketLimit.info}</p>
      </section>
    )}
  </div>
);

export default SideInfo;