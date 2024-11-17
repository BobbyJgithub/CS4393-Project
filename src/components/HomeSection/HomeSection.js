import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import EventCard from '../EventCard/EventCard';
import styles from './HomeSection.module.css';

const HomeSection = ({ title, items, type }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 9
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1900 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 1900, min: 1400 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1400, min: 650 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1
    }
  };

  return (
    <div className={styles.section}>
      <h2>{title}</h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass={styles["carousel-container"]}
        itemClass={styles["carousel-item"]}
        removeArrowOnDeviceType={["mobile"]}
        partialVisible={false}
        slidesToSlide={3}
        centerMode={false}
      >
        {items.map(item => (
          <EventCard key={item.id} event={item} />
        ))}
      </Carousel>
    </div>
  );
};

export default HomeSection;