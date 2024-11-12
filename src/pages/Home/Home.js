import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventsThunk } from '../../redux/eventsSlice';
import EventCard from '../../components/EventCard/EventCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import styles from './Home.module.css';

function Home() {
  const dispatch = useDispatch();
  const { events, isLoading, hasError } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEventsThunk('music')); // Initial load with a default query
  }, [dispatch]);

  const handleSearch = (query) => {
    dispatch(fetchEventsThunk(query));
  };

  if (isLoading) return <p>Loading events...</p>;
  if (hasError) return <p>Failed to load events.</p>;

  const eventsList = events.filter(item => item.type === 'event');
  const attractionsList = events.filter(item => item.type === 'attraction');

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      
      {eventsList.length > 0 && (
        <div className={styles["section"]}>
          <h2>Events</h2>
          <div className={styles["events-container"]}>
            {eventsList.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}

      {attractionsList.length > 0 && (
        <div className={styles["section"]}>
          <h2>Attractions</h2>
          <div className={styles["events-container"]}>
            {attractionsList.map((attraction) => (
              <EventCard key={attraction.id} event={attraction} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;