import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/slices/cartSlice';
import CartItem from '../../components/CartItem/CartItem';
import styles from './Cart.module.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    alert('This is a mock checkout. In a real app, this would proceed to payment.');
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