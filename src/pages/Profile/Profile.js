import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './Profile.module.css';
import { getFavorites, getVerifiedFans } from '../../utils/auth';
import EventCard from '../../components/EventCard/EventCard';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [favorites, setFavorites] = useState([]);
  const [verifiedFans, setVerifiedFans] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      const updateUserData = () => {
        const userFavorites = getFavorites(user.id) || [];
        const userVerifiedFans = getVerifiedFans(user.id) || [];
        setFavorites(userFavorites);
        setVerifiedFans(userVerifiedFans);
      };

      updateUserData();
      window.addEventListener('storage', updateUserData);
      return () => window.removeEventListener('storage', updateUserData);
    }
  }, [user]);

  if (!user) return <Navigate to="/" />;

  return (
    <div className={styles.profile}>
      <h1>Profile</h1>
      <div className={styles.info}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      <div className={styles.favorites}>
        <h2>Favorite Attractions</h2>
        <div className={styles.favoriteGrid}>
          {favorites.map(attraction => (
            <EventCard key={attraction.id} event={attraction} />
          ))}
        </div>
      </div>

      <div className={styles.verifiedFans}>
        <h2>Verified Fan Of</h2>
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
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

export default Profile;