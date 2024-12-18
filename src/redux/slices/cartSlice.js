import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  subtotal: 0,
  tax: 0,
  fees: 0,
  total: 0,
};

const calculatePrices = (items) => {
  const subtotal = items.reduce((sum, item) => {
    // Handle both ticket and merch items
    if (item.type === 'merchandise') {
      return sum + item.price;
    }
    return sum + item.price * item.quantity;
  }, 0);
  
  const tax = subtotal * 0.08;
  const fees = items.reduce((sum, item) => {
    // Only apply fees to tickets, not merchandise
    if (item.type !== 'merchandise') {
      return sum + item.price * item.quantity * 0.01;
    }
    return sum;
  }, 0);
  
  const total = subtotal + tax + fees;
  
  return { subtotal, tax, fees, total };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      Object.assign(state, calculatePrices(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      Object.assign(state, calculatePrices(state.items));
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;