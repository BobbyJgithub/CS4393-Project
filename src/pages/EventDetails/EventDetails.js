// src/pages/EventDetails.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchEventDetailsThunk } from '../../redux/slices/eventDetailsSlice';
import { fetchVenueDetailsThunk } from '../../redux/slices/venueDetailsSlice';
import styles from './EventDetails.module.css';
import TicketSelector from '../../components/TicketSelector/TicketSelector';
import HeroSection from '../../components/EventDetails/HeroSection';
import MainInfo from '../../components/EventDetails/MainInfo';
import SideInfo from '../../components/EventDetails/SideInfo';

function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { event, isLoading, hasError } = useSelector((state) => state.eventDetails);
  const { venue, isLoading: isLoadingVenue } = useSelector((state) => state.venueDetails);
  const [expandedSections, setExpandedSections] = useState({});
  const [retryCount, setRetryCount] = useState(0);

  const maxRetries = 10;
  const retryDelay = 1; // 1 second

  useEffect(() => {
    dispatch(fetchEventDetailsThunk(id));
  }, [dispatch, id, retryCount]);

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

  useEffect(() => {
    if (hasError && retryCount < maxRetries) {
      setTimeout(() => setRetryCount(retryCount + 1), retryDelay);
    }
  }, [hasError, retryCount]);

  if (isLoading || isLoadingVenue) return <p>Loading event details...</p>;
  if (hasError) return <p>Failed to load event details. (Retrying... {retryCount}/{maxRetries})</p>;
  if (!event) return null;

  return (
    <div className={styles["event-details"]}>
      <HeroSection event={event} />
      <div className={styles["content-grid"]}>
        <MainInfo event={event} venue={venue} isLoadingVenue={isLoadingVenue} expandedSections={expandedSections} toggleSection={toggleSection} />
        <SideInfo event={event} />
      </div>
    </div>
  );
}

export default EventDetails;