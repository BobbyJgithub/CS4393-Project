import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk, clearSearchResults } from '../../redux/slices/eventsSlice';
import EventCard from '../../components/EventCard/EventCard';
import SearchInfo from '../../components/SearchInfo/SearchInfo';
import { fetchPopularEvents, fetchPopularAttractions } from '../../utils/api';
import styles from './Home.module.css';

const Section = ({ title, items, type }) => (
  <div className={styles.section}>
    <h2>{title}</h2>
    <div className={styles["events-container"]}>
      {items.map(item => (
        <EventCard key={item.id} event={item} />
      ))}
    </div>
  </div>
);

const Home = () => {
  const dispatch = useDispatch();
  const { events, isLoading: isSearchLoading, hasError } = useSelector(state => state.events);
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
        setTimeout(() => setRetryCount(retryCount + 1), retryDelay);
      }
    } finally {
      setIsLoadingPopular(false);
    }
  };

  useEffect(() => {
    fetchPopularContent();
  }, [retryCount]);

  useEffect(() => {
    if (!events.length && hasError && retryCount < maxRetries) {
      setTimeout(() => setRetryCount(retryCount + 1), retryDelay);
    }
  }, [hasError, retryCount, events.length]);

  const searchResults = events.length > 0 && (
    <>
      {events.filter(item => item.type === 'event' || !item.type).length > 0 && (
        <Section title="Events" items={events.filter(item => item.type === 'event' || !item.type)} />
      )}
      {events.filter(item => item.type === 'attraction').length > 0 && (
        <Section title="Attractions" items={events.filter(item => item.type === 'attraction')} />
      )}
    </>
  );

  const popularContent = !isLoadingPopular && (
    <>
      <Section title="Popular Events" items={popularEvents} />
      <Section title="Popular Attractions" items={popularAttractions} />
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
};

export default Home;