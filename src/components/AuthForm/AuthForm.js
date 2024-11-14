// components/AuthForm.js
import React from 'react';
import styles from '../AuthModal/AuthModal.module.css';

const AuthForm = ({ isLogin, username, password, setUsername, setPassword, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
  </form>
);

export default AuthForm;