import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/slices/cartSlice';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';
import { addPurchasedTicket } from '../../utils/auth';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);
  const { user } = useSelector(state => state.auth);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }

    // Save each ticket to user's purchase history
    items.forEach(ticket => {
      addPurchasedTicket(user.id, ticket);
    });

    alert('Purchase successful! Check your profile for ticket details.');
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return <div className={styles.empty}>Your cart is empty</div>;
  }

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {items.map(item => (
        <CartItem key={item.id} item={item} onRemove={handleRemoveItem} />
      ))}
      <div className={styles.cartTotal}>
        <h3>Total: ${total}</h3>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;