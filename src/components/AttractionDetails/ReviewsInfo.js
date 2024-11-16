import React from 'react';
import { mockReviews } from '../../assets/mockData/mockReviewData.js';
import styles from '../../pages/AttractionDetails/AttractionDetails.module.css';

const ReviewsInfo = () => {
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  return (
    <div className={styles["reviews-info"]}>
      <div className={styles["reviews-header"]}>
        <h3>Fan Reviews</h3>
        <div className={styles["rating-summary"]}>
          <span className={styles["average-rating"]}>{averageRating.toFixed(1)}</span>
          <div className={styles["stars"]}>
            {[...Array(5)].map((_, index) => (
              <span key={index} className={index < Math.round(averageRating) ? styles["star-filled"] : styles["star"]}>
                ★
              </span>
            ))}
          </div>
          <span>({mockReviews.length} reviews)</span>
        </div>
      </div>
      <div className={styles["reviews-list"]}>
        {mockReviews.map((review) => (
          <div key={review.id} className={styles["review-card"]}>
            <div className={styles["review-header"]}>
              <img src={review.avatar} alt={review.userName} />
              <div>
                <h4>{review.userName} {review.verified && <span className={styles["verified-badge"]}>✓ Verified Fan</span>}</h4>
                <div className={styles["stars"]}>
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < review.rating ? styles["star-filled"] : styles["star"]}>
                      ★
                    </span>
                  ))}
                </div>
                <span className={styles["review-date"]}>{new Date(review.date).toLocaleDateString()}</span>
              </div>
            </div>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsInfo;