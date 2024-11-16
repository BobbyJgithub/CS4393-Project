import React from "react";
import styles from "../../pages/AttractionDetails/AttractionDetails.module.css";

const SideInfo = ({ attraction, user, handleOpenModal }) => (
  <div className={styles["side-info"]}>
    {attraction.upcomingEvents && (
      <section>
        <h3>Upcoming Events</h3>
        <p>{attraction.upcomingEvents._total} total events</p>
      </section>
    )}
    {attraction.externalLinks && (
      <section>
        <h3>Follow On</h3>
        {Object.entries(attraction.externalLinks).map(([platform, links]) => (
          <a
            key={platform}
            href={links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles["social-link"]}>
            {platform}
          </a>
        ))}
      </section>
    )}
    {attraction.classifications?.[0] && (
      <section>
        <h3>Classifications</h3>
        <p>Genre: {attraction.classifications[0].genre?.name}</p>
        <p>Subgenre: {attraction.classifications[0].subGenre?.name}</p>
      </section>
    )}
    <div className={styles["action-buttons"]}>
      <button onClick={handleOpenModal} className={styles.verifiedFanButton}>
        Become a Verified Fan
      </button>
    </div>
  </div>
);

export default SideInfo;
