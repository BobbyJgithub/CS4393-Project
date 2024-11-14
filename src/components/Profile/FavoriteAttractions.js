
import React from 'react';
import styles from './FavoriteAttractions.module.css';
import EventCard from '../EventCard/EventCard';
import ProfileSection from './ProfileSection';

const FavoriteAttractions = ({ favorites }) => (
  <ProfileSection title="Favorite Attractions">
    <div className={styles.favoriteGrid}>
      {favorites.map(attraction => (
        <EventCard key={attraction.id} event={attraction} />
      ))}
    </div>
  </ProfileSection>
);

export default FavoriteAttractions;