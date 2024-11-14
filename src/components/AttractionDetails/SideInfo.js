
import React from 'react';
import styles from '../../pages/AttractionDetails/AttractionDetails.module.css';

const SideInfo = ({ attraction }) => (
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
            className={styles["social-link"]}
          >
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
        <p>Type: {attraction.classifications[0].type?.name}</p>
        <p>Subtype: {attraction.classifications[0].subType?.name}</p>
      </section>
    )}
  </div>
);

export default SideInfo;