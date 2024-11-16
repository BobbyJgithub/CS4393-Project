import React, { useEffect, useState } from 'react';
import styles from '../../pages/AttractionDetails/AttractionDetails.module.css';

const MerchInfo = () => {
  const [merch, setMerch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        // Fetch multiple items for demo
        const responses = await Promise.all([1,2,3,4].map(id => 
          fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
        ));
        setMerch(responses);
      } catch (error) {
        console.error('Error fetching merch:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMerch();
  }, []);

  if (isLoading) return <p>Loading merchandise...</p>;

  return (
    <div className={styles["merch-info"]}>
      <section>
        <h3>Official Merchandise</h3>
        <div className={styles["merch-grid"]}>
          {merch.map((item) => (
            <div key={item.id} className={styles["merch-card"]}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p className={styles["price"]}>${item.price}</p>
              <button className={styles["buy-button"]}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MerchInfo;