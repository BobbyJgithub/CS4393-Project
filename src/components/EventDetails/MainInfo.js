
import React from 'react';
import styles from '../../pages/EventDetails/EventDetails.module.css';
import TicketSelector from '../../components/TicketSelector/TicketSelector';
import VenueSection from './VenueSection';

const MainInfo = ({ event, venue, isLoadingVenue, expandedSections, toggleSection }) => (
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
    <VenueSection venue={venue} isLoadingVenue={isLoadingVenue} expandedSections={expandedSections} toggleSection={toggleSection} />
    <section>
      <TicketSelector event={event} />
    </section>
  </div>
);

export default MainInfo;