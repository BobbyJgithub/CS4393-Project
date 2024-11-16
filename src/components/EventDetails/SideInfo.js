import React from 'react';
import styles from '../../pages/EventDetails/EventDetails.module.css';

const SideInfo = ({ event }) => {
  const getVenueViewUrl = () => {
    if (!event._embedded?.venues?.[0]?.name) return null;
    const venueName = event._embedded.venues[0].name
      .replace(/\s+/g, '+') // Replace spaces with +
      .replace(/[^a-zA-Z0-9+]/g, ''); // Remove special characters
    console.log(venueName);
    return `https://aviewfrommyseat.com/venue/${venueName}/`;
  };

  return (
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
      {event._embedded?.venues?.[0]?.name && (
        <section>
          <h3>A View From My Seat</h3>
          <a 
            href={getVenueViewUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles["venue-view-button"]}
          >
            View Seat Photos
          </a>
          <p>A View From My Seat is a comprehensive library, made by the fans for the fans, which can be used to research what the view will be before, during or after buying tickets. </p>
        </section>
      )}
    </div>
  );
};

export default SideInfo;