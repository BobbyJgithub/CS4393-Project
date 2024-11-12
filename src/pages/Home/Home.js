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

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className={styles["events-container"]}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Home;