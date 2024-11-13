// src/pages/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventDetailsThunk } from '../../redux/slices/eventDetailsSlice';
import { fetchVenueDetailsThunk } from '../../redux/slices/venueDetailsSlice';
import styles from './EventDetails.module.css';
import TicketSelector from '../../components/TicketSelector/TicketSelector';

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, isLoading, hasError } = useSelector((state) => state.eventDetails);
  const { venue, isLoading: isLoadingVenue } = useSelector((state) => state.venueDetails);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    dispatch(fetchEventDetailsThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (event?._embedded?.venues?.[0]?.id) {
      dispatch(fetchVenueDetailsThunk(event._embedded.venues[0].id));
    }
  }, [dispatch, event]);

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  if (isLoading) return <p>Loading event details...</p>;
  if (hasError) return <p>Failed to load event details.</p>;

  if (!event) return null;

  const renderVenueSection = () => {
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
            <div 
              className={`${styles["expandable-section"]} ${styles["venue-location"]}`}
              onClick={() => toggleSection('location')}
            >
              <div className={styles["section-header"]}>
                <h5>Location</h5>
                <span className={`${styles.arrow} ${expandedSections.location ? styles.expanded : ''}`}>▼</span>
              </div>
              {expandedSections.location && (
                <div className={styles["section-content"]}>
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
                </div>
              )}
            </div>

            {venue.boxOfficeInfo && (
              <div 
                className={`${styles["expandable-section"]} ${styles["box-office"]}`}
                onClick={() => toggleSection('boxOffice')}
              >
                <div className={styles["section-header"]}>
                  <h5>Box Office Information</h5>
                  <span className={`${styles.arrow} ${expandedSections.boxOffice ? styles.expanded : ''}`}>▼</span>
                </div>
                {expandedSections.boxOffice && (
                  <div className={styles["section-content"]}>
                    {venue.boxOfficeInfo.phoneNumberDetail && (
                      <p><strong>Phone:</strong> {venue.boxOfficeInfo.phoneNumberDetail}</p>
                    )}
                    {venue.boxOfficeInfo.openHoursDetail && (
                      <p><strong>Hours:</strong> {venue.boxOfficeInfo.openHoursDetail}</p>
                    )}
                    {venue.boxOfficeInfo.acceptedPaymentDetail && (
                      <p><strong>Payment:</strong> {venue.boxOfficeInfo.acceptedPaymentDetail}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {venue.parkingDetail && (
              <div 
                className={`${styles["expandable-section"]} ${styles["parking"]}`}
                onClick={() => toggleSection('parking')}
              >
                <div className={styles["section-header"]}>
                  <h5>Parking Information</h5>
                  <span className={`${styles.arrow} ${expandedSections.parking ? styles.expanded : ''}`}>▼</span>
                </div>
                {expandedSections.parking && (
                  <div className={styles["section-content"]}>
                    <p>{venue.parkingDetail}</p>
                  </div>
                )}
              </div>
            )}

            {venue.accessibleSeatingDetail && (
              <div 
                className={`${styles["expandable-section"]} ${styles["accessibility"]}`}
                onClick={() => toggleSection('accessibility')}
              >
                <div className={styles["section-header"]}>
                  <h5>Accessibility</h5>
                  <span className={`${styles.arrow} ${expandedSections.accessibility ? styles.expanded : ''}`}>▼</span>
                </div>
                {expandedSections.accessibility && (
                  <div className={styles["section-content"]}>
                    <p>{venue.accessibleSeatingDetail}</p>
                  </div>
                )}
              </div>
            )}

            {venue.generalInfo && (
              <div 
                className={`${styles["expandable-section"]} ${styles["general-info"]}`}
                onClick={() => toggleSection('generalInfo')}
              >
                <div className={styles["section-header"]}>
                  <h5>General Information</h5>
                  <span className={`${styles.arrow} ${expandedSections.generalInfo ? styles.expanded : ''}`}>▼</span>
                </div>
                {expandedSections.generalInfo && (
                  <div className={styles["section-content"]}>
                    {venue.generalInfo.generalRule && (
                      <p><strong>Rules:</strong> {venue.generalInfo.generalRule}</p>
                    )}
                    {venue.generalInfo.childRule && (
                      <p><strong>Child Policy:</strong> {venue.generalInfo.childRule}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {venue.social && (
              <div 
                className={`${styles["expandable-section"]} ${styles["social"]}`}
                onClick={() => toggleSection('social')}
              >
                <div className={styles["section-header"]}>
                  <h5>Social Media</h5>
                  <span className={`${styles.arrow} ${expandedSections.social ? styles.expanded : ''}`}>▼</span>
                </div>
                {expandedSections.social && (
                  <div className={styles["section-content"]}>
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
                  </div>
                )}
              </div>
            )}

            {venue.upcomingEvents && (
              <div 
                className={`${styles["expandable-section"]} ${styles["upcoming-events"]}`}
                onClick={() => toggleSection('upcomingEvents')}
              >
                <div className={styles["section-header"]}>
                  <h5>Upcoming Events</h5>
                  <span className={`${styles.arrow} ${expandedSections.upcomingEvents ? styles.expanded : ''}`}>▼</span>
                </div>
                {expandedSections.upcomingEvents && (
                  <div className={styles["section-content"]}>
                    <p>Total upcoming events: {venue.upcomingEvents._total}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    );
  };

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

          {renderVenueSection()}

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

          {event.ticketLimit && (
            <section>
              <h3>Ticket Limit</h3>
              <p>{event.ticketLimit.info}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventDetails;