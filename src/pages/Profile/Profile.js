import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './Profile.module.css';
import { getFavorites } from '../../utils/auth';
import EventCard from '../../components/EventCard/EventCard';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [favorites, setFavorites] = useState([]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (user) {
      const updateFavorites = () => {
        const userFavorites = getFavorites(user.id) || [];
        setFavorites(userFavorites);
      };

      updateFavorites();
      window.addEventListener('storage', updateFavorites);
      return () => window.removeEventListener('storage', updateFavorites);
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

      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

export default Profile;