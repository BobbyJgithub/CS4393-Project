import React, { useState, useMemo } from 'react';
import styles from '../../pages/AttractionDetails/AttractionDetails.module.css';

const REVIEWS_PER_PAGE = 5;

const ReviewsInfo = ({ user, reviews }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, content: '' });

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  const filteredAndSortedReviews = useMemo(() => {
    let sortedReviews = [...reviews];
    
    if (filterBy === 'verified') {
      sortedReviews = sortedReviews.filter(review => review.verified);
    }
    
    sortedReviews.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
    
    return sortedReviews;
  }, [reviews, sortBy, filterBy]);

  const paginatedReviews = filteredAndSortedReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredAndSortedReviews.length / REVIEWS_PER_PAGE);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    // In a real app, this would make an API call
    alert('Review submitted successfully!');
    setShowReviewForm(false);
    setNewReview({ rating: 5, content: '' });
  };

  const starCounts = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      counts[review.rating] = (counts[review.rating] || 0) + 1;
    });
    return counts;
  }, [reviews]);

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
          <span>({reviews.length} reviews)</span>
        </div>
      </div>
      
      <div className={styles["star-breakdown"]}>
        {[5, 4, 3, 2, 1].map(rating => (
          <div key={rating} className={styles["star-row"]}>
            <div className={styles["star-label"]}>
              {rating} {rating === 1 ? 'star' : 'stars'}
            </div>
            <div className={styles["star-bar-container"]}>
              <div 
                className={styles["star-bar"]} 
                style={{
                  width: `${(starCounts[rating] / reviews.length) * 100}%`
                }}
              />
            </div>
            <div className={styles["star-count"]}>
              {starCounts[rating]}
            </div>
          </div>
        ))}
      </div>

      <div className={styles["reviews-controls"]}>
        <div className={styles["reviews-actions"]}>
          {user && (
            <button 
              className={styles["write-review"]}
              onClick={() => setShowReviewForm(true)}
            >
              Write a Review
            </button>
          )}
        </div>
        
        <div className={styles["reviews-filters"]}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date">Most Recent</option>
            <option value="rating">Highest Rated</option>
          </select>
          <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
            <option value="all">All Reviews</option>
            <option value="verified">Verified Fans Only</option>
          </select>
        </div>
      </div>

      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className={styles["review-form"]}>
          <div className={styles["rating-input"]}>
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
                className={index < newReview.rating ? styles["star-filled"] : styles["star"]}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={newReview.content}
            onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
            placeholder="Write your review here..."
            required
          />
          <div className={styles["form-buttons"]}>
            <button type="submit">Submit Review</button>
            <button type="button" onClick={() => setShowReviewForm(false)}>Cancel</button>
          </div>
        </form>
      )}

      <div className={styles["reviews-list"]}>
        {paginatedReviews.map((review) => (
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

      {totalPages > 1 && (
        <div className={styles["pagination"]}>
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>{currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsInfo;