
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate, Navigate } from 'react-router-dom';
import styles from './Profile.module.css';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!user) return <Navigate to="/" />;

  return (
    <div className={styles.profile}>
      <h1>Profile</h1>
      <div className={styles.info}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Member since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

export default Profile;