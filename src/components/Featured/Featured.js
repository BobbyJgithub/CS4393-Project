import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { fetchAttractionById } from '../../utils/api';
import styles from './Featured.module.css';
import { Link } from 'react-router-dom';
import { getHighestResImage } from '../../utils/imageHelpers';

const Featured = () => {
  const [featuredAttractions, setFeaturedAttractions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // IDs of featured attractions you want to display
  const featuredIds = [
    'K8vZ9173-lV', // Example ID - replace with actual attraction IDs
    'K8vZ9172Qo7',
    'K8vZ9175Tr0'
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const promises = featuredIds.map(id => fetchAttractionById(id));
        const results = await Promise.all(promises);
        setFeaturedAttractions(results);
      } catch (error) {
        console.error('Error fetching featured attractions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  if (isLoading) return <div>Loading featured attractions...</div>;

  return (
    <div className={styles.featured}>
      <h2>Featured Attractions</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        transitionDuration={500}
      >
        {featuredAttractions.map(attraction => (
          <div key={attraction.id} className={styles.slide}>
            <Link to={`/attraction/${attraction.id}`}>
              <img
                src={getHighestResImage(attraction.images)}
                alt={attraction.name}
              />
              <div className={styles.slideContent}>
                <h3>{attraction.name}</h3>
                {attraction.classifications?.[0] && (
                  <p>{attraction.classifications[0].segment?.name} - {attraction.classifications[0].genre?.name}</p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Featured;