
import React, { useState, useEffect } from "react";
import { toggleFavorite, getFavorites } from '../../utils/auth';
import styles from "./FavoriteButton.module.css";
import { Heart } from 'lucide-react';

function FavoriteButton({ event, user }) {
  const favorites = user ? (getFavorites(user.id) || []) : [];
  const initialFavoriteState = favorites.some(fav => fav.id === event.id);
  const [isFavorite, setIsFavorite] = useState(initialFavoriteState);

  useEffect(() => {
    setIsFavorite(initialFavoriteState);
  }, [initialFavoriteState]);

  const handleFavorite = (e) => {
    e.preventDefault();
    if (!user) return;
    toggleFavorite(user.id, event);
    setIsFavorite(!isFavorite);
  };

  return (
    <button 
      onClick={handleFavorite}
      className={`${styles.heartButton} ${isFavorite ? styles.favorite : ''}`}
    >
      <Heart fill={isFavorite ? 'red' : 'none'} color={isFavorite ? 'red' : 'black'}/>
    </button>
  );
}

export default FavoriteButton;