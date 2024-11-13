import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk } from '../../redux/slices/eventsSlice';
import EventCard from '../../components/EventCard/EventCard';
import styles from './Home.module.css';
import { fetchPopularEvents, fetchPopularAttractions } from '../../utils/api';
import SearchInfo from '../../components/SearchInfo/SearchInfo';
import { clearSearchResults } from '../../redux/slices/eventsSlice';

function Home() {
  const dispatch = useDispatch();
  const { events, isLoading: isSearchLoading, hasError } = useSelector((state) => state.events);
  const [popularEvents, setPopularEvents] = useState([]);
  const [popularAttractions, setPopularAttractions] = useState([]);
  const [isLoadingPopular, setIsLoadingPopular] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 5;
  const retryDelay = 2000; // 2 seconds

  const fetchPopularContent = async () => {
    try {
      setIsLoadingPopular(true);
      const [events, attractions] = await Promise.all([
        fetchPopularEvents(),
        fetchPopularAttractions()
      ]);
      setPopularEvents(events);
      setPopularAttractions(attractions);
      setError(null); // Reset error on success
    } catch (err) {
      setError(err.message);

      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount(retryCount + 1);
        }, retryDelay);
      }
    } finally {
      setIsLoadingPopular(false);
    }
  };

  useEffect(() => {
    fetchPopularContent();
  }, [retryCount]); // Retry when retryCount changes

  useEffect(() => {
    if (!events.length && hasError && retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(retryCount + 1);
      }, retryDelay);
    }
  }, [hasError, retryCount, events.length]);

  const searchResults = events.length > 0 && (
      <>
        {events.filter(item => item.type === 'event' || !item.type).length > 0 && (
            <div className={styles["section"]}>
              <h2>Events</h2>
              <div className={styles["events-container"]}>
                {events.filter(item => item.type === 'event' || !item.type).map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
        )}

        {events.filter(item => item.type === 'attraction').length > 0 && (
            <div className={styles["section"]}>
              <h2>Attractions</h2>
              <div className={styles["events-container"]}>
                {events.filter(item => item.type === 'attraction').map((attraction) => (
                    <EventCard key={attraction.id} event={attraction} />
                ))}
              </div>
            </div>
        )}
      </>
  );

  const popularContent = !isLoadingPopular && (
      <>
        <div className={styles["section"]}>
          <h2>Popular Events</h2>
          <div className={styles["events-container"]}>
            {popularEvents.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        <div className={styles["section"]}>
          <h2>Popular Attractions</h2>
          <div className={styles["events-container"]}>
            {popularAttractions.map((attraction) => (
                <EventCard key={attraction.id} event={attraction} />
            ))}
          </div>
        </div>
      </>
  );

  if (isSearchLoading && isLoadingPopular) return <p>Loading...</p>;
  if (hasError || error) return <p>Error: {hasError || error} (Retrying... {retryCount}/{maxRetries})</p>;

  return (
      <div>
        <SearchInfo />
        {searchResults}
        {!events.length && popularContent}
      </div>
  );
}

export default Home;