import React from "react";
import styles from "../../pages/AttractionDetails/AttractionDetails.module.css";
import { getHighestResImage } from "../../utils/imageHelpers";
import FavoriteButton from "../FavoriteButton/FavoriteButton";

const HeroSection = ({
  attraction,
  user,
  handleFavorite,
  handleOpenModal,
  isFavorite,
}) => (
  <div className={styles["hero-section"]}>
    <img
      src={getHighestResImage(attraction.images)}
      alt={attraction.name}
      className={styles["hero-image"]}
    />
    <div className={styles["hero-content"]}>
      <div className={styles["hero-header"]}>
        <h1>{attraction.name}</h1>
        <div className={styles["action-buttons"]}>
          <div className={styles.favoriteButton}>
            {user && (
              <FavoriteButton
                event={attraction}
                user={user}
                defaultColor="white"
              />
            )}
          </div>
        </div>
      </div>
      {attraction.classifications?.[0] && (
        <h2>
          {attraction.classifications[0].segment?.name} -{" "}
          {attraction.classifications[0].genre?.name}
        </h2>
      )}
    </div>
  </div>
);

export default HeroSection;
