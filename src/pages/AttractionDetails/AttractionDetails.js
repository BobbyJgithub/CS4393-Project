import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAttractionDetailsThunk, fetchAttractionEventsThunk } from '../../redux/slices/attractionDetailsSlice';
import { toggleFavorite, getFavorites, submitVerifiedFanRequest } from '../../utils/auth';
import styles from './AttractionDetails.module.css';
import HeroSection from '../../components/AttractionDetails/HeroSection';
import MainInfo from '../../components/AttractionDetails/MainInfo';
import SideInfo from '../../components/AttractionDetails/SideInfo';
import Modal from '../../components/AttractionDetails/Modal';

function AttractionDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { attraction, events, isLoading, hasError, isLoadingEvents, hasEventsError } = useSelector((state) => state.attractionDetails);
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
      <HeroSection 
        attraction={attraction} 
        user={user} 
        handleFavorite={handleFavorite} 
        handleOpenModal={handleOpenModal} 
        isFavorite={isFavorite} 
      />
      <div className={styles["content-grid"]}>
        <MainInfo 
          attraction={attraction} 
          events={events} 
          isLoadingEvents={isLoadingEvents} 
          hasEventsError={hasEventsError} 
        />
        <SideInfo attraction={attraction} />
      </div>
      {isModalOpen && (
        <Modal 
          attraction={attraction} 
          fanRequest={fanRequest} 
          setFanRequest={setFanRequest} 
          handleSubmitFanRequest={handleSubmitFanRequest} 
          setIsModalOpen={setIsModalOpen} 
        />
      )}
    </div>
  );
}

export default AttractionDetails;