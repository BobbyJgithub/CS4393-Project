import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAttractionDetailsThunk, fetchAttractionEventsThunk } from '../../redux/slices/attractionDetailsSlice';
import { toggleFavorite, getFavorites, submitVerifiedFanRequest } from '../../utils/auth';
import styles from './AttractionDetails.module.css';

function AttractionDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { 
    attraction, 
    events,
    isLoading, 
    hasError,
    isLoadingEvents,
    hasEventsError 
  } = useSelector((state) => state.attractionDetails);
  const { user } = useSelector(state => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fanRequest, setFanRequest] = useState('');

  useEffect(() => {
    dispatch(fetchAttractionDetailsThunk(id));
    dispatch(fetchAttractionEventsThunk(id));
  }, [dispatch, id]);

  const favorites = user ? (getFavorites(user.id) || []) : [];
  const isFavorite = favorites.some(fav => fav.id === attraction?.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    if (!user) return;
    toggleFavorite(user.id, { ...attraction, type: 'attraction' });
    window.dispatchEvent(new Event('storage'));
  };

  const handleOpenModal = () => {
    if (!user) {
      alert('Please log in to submit a verified fan request');
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmitFanRequest = (e) => {
    e.preventDefault();
    const success = submitVerifiedFanRequest(user.id, { ...attraction, type: 'attraction' }, fanRequest);
    if (success) {
      alert('Your verified fan request has been approved!');
      window.dispatchEvent(new Event('storage'));
    } else {
      alert('You are already a verified fan of this attraction.');
    }
    setIsModalOpen(false);
    setFanRequest('');
  };

  if (isLoading) return <p>Loading attraction details...</p>;
  if (hasError) return <p>Failed to load attraction details.</p>;
  if (!attraction) return null;

  return (
    <div className={styles["attraction-details"]}>
      <div className={styles["hero-section"]}>
        <img 
          src={attraction.images?.find(img => img.ratio === "16_9")?.url || attraction.images?.[0]?.url} 
          alt={attraction.name} 
          className={styles["hero-image"]}
        />
        <div className={styles["hero-content"]}>
          <div className={styles["hero-header"]}>
            <h1>{attraction.name}</h1>
            <div className={styles["action-buttons"]}>
              {user && (
                <button 
                  onClick={handleFavorite}
                  className={`${styles.heartButton} ${isFavorite ? styles.favorite : ''}`}
                >
                  ❤️
                </button>
              )}
              <button 
                onClick={handleOpenModal}
                className={styles.verifiedFanButton}
              >
                Become a Verified Fan
              </button>
            </div>
          </div>
          {attraction.classifications?.[0] && (
            <h2>{attraction.classifications[0].segment?.name} - {attraction.classifications[0].genre?.name}</h2>
          )}
        </div>
      </div>

      <div className={styles["content-grid"]}>
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
              {events.map(event => (
                <Link 
                  to={`/event/${event.id}`} 
                  key={event.id}
                  className={styles["event-card"]}
                >
                  <img 
                    src={event.images?.find(img => img.ratio === "16_9")?.url || event.images?.[0]?.url}
                    alt={event.name}
                  />
                  <h4>{event.name}</h4>
                  <p>{new Date(event.dates.start.dateTime).toLocaleDateString()}</p>
                  {event._embedded?.venues?.[0] && (
                    <p>
                      {event._embedded.venues[0].city?.name}
                      {event._embedded.venues[0].state?.stateCode && 
                        `, ${event._embedded.venues[0].state.stateCode}`
                      }
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        </div>

        <div className={styles["side-info"]}>
          {attraction.upcomingEvents && (
            <section>
              <h3>Upcoming Events</h3>
              <p>{attraction.upcomingEvents._total} total events</p>
            </section>
          )}

          {attraction.externalLinks && (
            <section>
              <h3>Follow On</h3>
              {Object.entries(attraction.externalLinks).map(([platform, links]) => (
                <a 
                  key={platform}
                  href={links[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles["social-link"]}
                >
                  {platform}
                </a>
              ))}
            </section>
          )}

          {attraction.classifications?.[0] && (
            <section>
              <h3>Classifications</h3>
              <p>Genre: {attraction.classifications[0].genre?.name}</p>
              <p>Subgenre: {attraction.classifications[0].subGenre?.name}</p>
              <p>Type: {attraction.classifications[0].type?.name}</p>
              <p>Subtype: {attraction.classifications[0].subType?.name}</p>
            </section>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Become a Verified Fan</h2>
            <p>Tell us why you want to become a verified fan of {attraction.name}</p>
            <form onSubmit={handleSubmitFanRequest}>
              <textarea
                value={fanRequest}
                onChange={(e) => setFanRequest(e.target.value)}
                placeholder="Write your request here..."
                rows={5}
                required
              />
              <div className={styles.modalButtons}>
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttractionDetails;