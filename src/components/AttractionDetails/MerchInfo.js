import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import styles from '../../pages/AttractionDetails/AttractionDetails.module.css';

const MerchInfo = ({ attractionId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const cartItems = useSelector(state => state.cart.items);
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

  const handleAddToCart = (item) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    const cartItem = {
      id: `merch-${attractionId}-${item.id}-${Date.now()}`,
      type: 'merchandise',
      name: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      attractionId // Add attraction ID to identify source
    };

    dispatch(addToCart(cartItem));
  };

  const isInCart = (itemId) => {
    return cartItems.some(item => 
      item.type === 'merchandise' && 
      item.attractionId === attractionId && 
      item.id.includes(`merch-${attractionId}-${itemId}`)
    );
  };

  if (isLoading) return <p>Loading merchandise...</p>;

  return (
    <div className={styles["merch-info"]}>
      <section>
        <h3>Official Merchandise</h3>
        <div className={styles["merch-grid"]}>
          {merch.map((item) => (
            <div key={item.id} className={styles["merch-card"]}>
              <div className={styles["merch-status"]}>
                {isInCart(item.id) && <span className={styles["in-cart"]}>In Cart</span>}
              </div>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p className={styles["price"]}>${item.price}</p>
              <button 
                className={`${styles["buy-button"]} ${isInCart(item.id) ? styles["in-cart"] : ''}`}
                onClick={() => handleAddToCart(item)}
                disabled={isInCart(item.id)}
              >
                {isInCart(item.id) ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MerchInfo;