// components/AuthModal.js
import React from 'react';
import useAuthForm from '../../hooks/useAuthFormHook';
import AuthForm from '../AuthForm/AuthForm';
import styles from './AuthModal.module.css';

const AuthModal = ({ onClose }) => {
  const {
    isLogin,
    username,
    password,
    setIsLogin,
    setUsername,
    setPassword,
    handleSubmit
  } = useAuthForm(onClose);

  return (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button className={styles.closeIcon} onClick={onClose}>×</button>
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          <AuthForm
              isLogin={isLogin}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
          />
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
          </button>
        </div>
      </div>
  );
};

export default AuthModal;