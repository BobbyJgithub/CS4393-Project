import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import EventCard from '../EventCard/EventCard';
import styles from './HomeSection.module.css';

const HomeSection = ({ title, items, type }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1500 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
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