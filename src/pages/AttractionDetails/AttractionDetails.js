import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchAttractionDetailsThunk, fetchAttractionEventsThunk } from '../../redux/slices/attractionDetailsSlice';
import { toggleFavorite, getFavorites, submitVerifiedFanRequest } from '../../utils/auth';
import styles from './AttractionDetails.module.css';
import HeroSection from '../../components/AttractionDetails/HeroSection';
import MainInfo from '../../components/AttractionDetails/MainInfo';
import SideInfo from '../../components/AttractionDetails/SideInfo';
import Modal from '../../components/AttractionDetails/Modal';
import MerchInfo from '../../components/AttractionDetails/MerchInfo';
import ReviewsInfo from '../../components/AttractionDetails/ReviewsInfo';
import { mockReviews } from '../../assets/mockData/mockReviewData.js';

const TOTAL_RANDOM_REVIEWS = 20;

function AttractionDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { attraction, events, isLoading, hasError, isLoadingEvents, hasEventsError } = useSelector((state) => state.attractionDetails);
  const { user } = useSelector(state => state.auth);
  
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 10;
  const retryDelay = 1;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fanRequest, setFanRequest] = useState('');
  const [activeTab, setActiveTab] = useState('info'); // Add this state

  useEffect(() => {
    dispatch(fetchAttractionDetailsThunk(id));
    dispatch(fetchAttractionEventsThunk(id));
  }, [dispatch, id, retryCount]);

  useEffect(() => {
    if (!attraction && hasError && retryCount < maxRetries) {
      setTimeout(() => setRetryCount(retryCount + 1), retryDelay);
    }
  }, [hasError, retryCount, attraction]);

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

  // Move random reviews selection here
  const randomReviews = useMemo(() => {
    const shuffled = [...mockReviews].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, TOTAL_RANDOM_REVIEWS);
  }, []);

  const averageRating = useMemo(() => {
    const total = randomReviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / randomReviews.length).toFixed(1);
  }, [randomReviews]);

  if (isLoading) return <p>Loading attraction details...</p>;
  if (hasError) return <p>Error: {hasError} (Retrying... {retryCount}/{maxRetries})</p>;
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
        <div>
          <div className={styles["tabs"]}>
            <button 
              className={`${styles["tab"]} ${activeTab === 'info' ? styles["active"] : ''}`}
              onClick={() => setActiveTab('info')}
            >
              Information
            </button>
            <button 
              className={`${styles["tab"]} ${activeTab === 'merch' ? styles["active"] : ''}`}
              onClick={() => setActiveTab('merch')}
            >
              Merchandise
            </button>
            <button 
              className={`${styles["tab"]} ${activeTab === 'reviews' ? styles["active"] : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
              <span className={styles["tab-rating"]}>
                <span className={styles["star-filled"]}>★</span>
                {averageRating}
              </span>
            </button>
          </div>
          {activeTab === 'info' && (
            <MainInfo 
              attraction={attraction} 
              events={events} 
              isLoadingEvents={isLoadingEvents} 
              hasEventsError={hasEventsError} 
              user={user}
            />
          )}
          {activeTab === 'merch' && <MerchInfo attractionId={attraction.id} />}
          {activeTab === 'reviews' && <ReviewsInfo user={user} reviews={randomReviews} />}
        </div>
        <SideInfo 
          attraction={attraction} 
          user={user}
          handleOpenModal={handleOpenModal}
        />
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