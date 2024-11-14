
import React from 'react';
import styles from '../../pages/EventDetails/EventDetails.module.css';

const VenueSection = ({ venue, isLoadingVenue, expandedSections, toggleSection }) => {
  if (isLoadingVenue) return <p>Loading venue details...</p>;
  if (!venue) return null;

  return (
    <section className={styles["venue-section"]}>
      <div className={styles["venue-header"]} onClick={() => toggleSection('main')}>
        <h3>Venue Information</h3>
        <span className={`${styles.arrow} ${expandedSections.main ? styles.expanded : ''}`}>▼</span>
      </div>
      {expandedSections.main && (
        <div className={styles["venue-details-grid"]}>
          <ExpandableSection title="Location" expanded={expandedSections.location} toggleSection={() => toggleSection('location')}>
            <p>{venue.address?.line1}</p>
            <p>{venue.city?.name}, {venue.state?.stateCode} {venue.postalCode}</p>
            <p>{venue.country?.name}</p>
            {venue.location && (
              <a 
                href={`https://maps.google.com/?q=${venue.location.latitude},${venue.location.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Map
              </a>
            )}
          </ExpandableSection>
          {venue.boxOfficeInfo && (
            <ExpandableSection title="Box Office Information" expanded={expandedSections.boxOffice} toggleSection={() => toggleSection('boxOffice')}>
              {venue.boxOfficeInfo.phoneNumberDetail && (
                <p><strong>Phone:</strong> {venue.boxOfficeInfo.phoneNumberDetail}</p>
              )}
              {venue.boxOfficeInfo.openHoursDetail && (
                <p><strong>Hours:</strong> {venue.boxOfficeInfo.openHoursDetail}</p>
              )}
              {venue.boxOfficeInfo.acceptedPaymentDetail && (
                <p><strong>Payment:</strong> {venue.boxOfficeInfo.acceptedPaymentDetail}</p>
              )}
            </ExpandableSection>
          )}
          {venue.parkingDetail && (
            <ExpandableSection title="Parking Information" expanded={expandedSections.parking} toggleSection={() => toggleSection('parking')}>
              <p>{venue.parkingDetail}</p>
            </ExpandableSection>
          )}
          {venue.accessibleSeatingDetail && (
            <ExpandableSection title="Accessibility" expanded={expandedSections.accessibility} toggleSection={() => toggleSection('accessibility')}>
              <p>{venue.accessibleSeatingDetail}</p>
            </ExpandableSection>
          )}
          {venue.generalInfo && (
            <ExpandableSection title="General Information" expanded={expandedSections.generalInfo} toggleSection={() => toggleSection('generalInfo')}>
              {venue.generalInfo.generalRule && (
                <p><strong>Rules:</strong> {venue.generalInfo.generalRule}</p>
              )}
              {venue.generalInfo.childRule && (
                <p><strong>Child Policy:</strong> {venue.generalInfo.childRule}</p>
              )}
            </ExpandableSection>
          )}
          {venue.social && (
            <ExpandableSection title="Social Media" expanded={expandedSections.social} toggleSection={() => toggleSection('social')}>
              {Object.entries(venue.social).map(([platform, link]) => (
                <a 
                  key={platform}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["social-link"]}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </ExpandableSection>
          )}
          {venue.upcomingEvents && (
            <ExpandableSection title="Upcoming Events" expanded={expandedSections.upcomingEvents} toggleSection={() => toggleSection('upcomingEvents')}>
              <p>Total upcoming events: {venue.upcomingEvents._total}</p>
            </ExpandableSection>
          )}
        </div>
      )}
    </section>
  );
};

const ExpandableSection = ({ title, expanded, toggleSection, children }) => (
  <div className={`${styles["expandable-section"]}`} onClick={toggleSection}>
    <div className={styles["section-header"]}>
      <h5>{title}</h5>
      <span className={`${styles.arrow} ${expanded ? styles.expanded : ''}`}>▼</span>
    </div>
    {expanded && (
      <div className={styles["section-content"]}>
        {children}
      </div>
    )}
  </div>
);

export default VenueSection;