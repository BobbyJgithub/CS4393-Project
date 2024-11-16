import React from "react";
import { Link } from "react-router-dom";
import styles from "../../pages/AttractionDetails/AttractionDetails.module.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const MainInfo = ({
  attraction,
  events,
  isLoadingEvents,
  hasEventsError,
  user,
}) => (
  <div className={styles["main-info"]}>
    {attraction.description && (
      <section>
        <h3>About</h3>
        <p>{attraction.description}</p>
      </section>
    )}
    {attraction.additionalInfo && (
      <section>
        <h3>Additional Information</h3>
        <p>{attraction.additionalInfo}</p>
      </section>
    )}
    <section className={styles["events-section"]}>
      <h3>Upcoming Events</h3>
      {isLoadingEvents && <p>Loading events...</p>}
      {hasEventsError && <p>Failed to load events.</p>}
      {events.length === 0 && !isLoadingEvents && <p>No upcoming events.</p>}
      <div className={styles["events-grid"]}>
        {events.map((event) => (
          <Link
            to={`/event/${event.id}`}
            key={event.id}
            className={styles["event-card"]}>
            <img
              src={
                event.images?.find((img) => img.ratio === "16_9")?.url ||
                event.images?.[0]?.url
              }
              alt={event.name}
            />
            <h4>{event.name}</h4>
            <p>{new Date(event.dates.start.dateTime).toLocaleDateString()}</p>
            {event._embedded?.venues?.[0] && (
              <p>
                {event._embedded.venues[0].city?.name}
                {event._embedded.venues[0].state?.stateCode &&
                  `, ${event._embedded.venues[0].state.stateCode}`}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  </div>
);

export default MainInfo;
