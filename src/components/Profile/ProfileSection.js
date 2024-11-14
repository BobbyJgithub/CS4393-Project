
import React from 'react';
import styles from './ProfileSection.module.css';

const ProfileSection = ({ title, children }) => (
  <div className={styles.section}>
    <h2>{title}</h2>
    {children}
  </div>
);

export default ProfileSection;