
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAttractionDetailsThunk } from '../../redux/attractionDetailsSlice';
import styles from './AttractionDetails.module.css';

function AttractionDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { attraction, isLoading, hasError } = useSelector((state) => state.attractionDetails);

  useEffect(() => {
    dispatch(fetchAttractionDetailsThunk(id));
  }, [dispatch, id]);

  if (isLoading) return <p>Loading attraction details...</p>;
  if (hasError) return <p>Failed to load attraction details.</p>;
  if (!attraction) return null;

  return (
    <div className={styles["attraction-details"]}>
      <div className={styles["hero-section"]}>
        <img 
          src={attraction.images?.find(img => img.ratio === "16_9")?.url || attraction.images?.[0]?.url} 
          alt={attraction.name} 
          className={styles["hero-image"]}
        />
        <div className={styles["hero-content"]}>
          <h1>{attraction.name}</h1>
          {attraction.classifications?.[0] && (
            <h2>{attraction.classifications[0].segment?.name} - {attraction.classifications[0].genre?.name}</h2>
          )}
        </div>
      </div>

      <div className={styles["content-grid"]}>
        <div className={styles["main-info"]}>
          {attraction.description && (
            <section>
              <h3>About</h3>
              <p>{attraction.description}</p>
            </section>
          )}

          {attraction.additionalInfo && (
            <section>
              <h3>Additional Information</h3>
              <p>{attraction.additionalInfo}</p>
            </section>
          )}
        </div>

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
      </div>
    </div>
  );
}

export default AttractionDetails;