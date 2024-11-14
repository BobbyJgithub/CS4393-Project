
import React from 'react';
import styles from './VerifiedFans.module.css';
import EventCard from '../EventCard/EventCard';
import ProfileSection from './ProfileSection';

const VerifiedFans = ({ verifiedFans }) => (
  <ProfileSection title="Verified Fan Of">
    <div className={styles.favoriteGrid}>
      {verifiedFans.map(attraction => (
        <div key={attraction.id} className={styles.verifiedFanCard}>
          <EventCard event={attraction} />
          <p className={styles.verificationDate}>
            Verified since: {new Date(attraction.verifiedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  </ProfileSection>
);

export default VerifiedFans;