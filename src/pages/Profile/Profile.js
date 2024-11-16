import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './Profile.module.css';
import { getFavorites, getVerifiedFans } from '../../utils/auth';
import FavoriteAttractions from '../../components/Profile/FavoriteAttractions';
import VerifiedFans from '../../components/Profile/VerifiedFans';

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
      <div className={styles.profileGrid}>
        <div className={styles.section}>
          <h1>Profile</h1>
          <p><strong>Username:</strong> {user.username}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
        
        <div className={styles.contentRow}>
          <FavoriteAttractions favorites={favorites} />
          <VerifiedFans verifiedFans={verifiedFans} />
        </div>
      </div>
    </div>
  );
}

export default Profile;