
import React from 'react';
import styles from '../../pages/AttractionDetails/AttractionDetails.module.css';
import { getHighestResImage } from '../../utils/imageHelpers';

const HeroSection = ({ attraction, user, handleFavorite, handleOpenModal, isFavorite }) => (
  <div className={styles["hero-section"]}>
    <img 
      src={getHighestResImage(attraction.images)} 
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
);

export default HeroSection;