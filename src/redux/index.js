import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import eventDetailsReducer from './eventDetailsSlice';
import attractionDetailsReducer from './attractionDetailsSlice';
import filterReducer from './filterSlice';
import cartReducer from './cartSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    eventDetails: eventDetailsReducer,
    attractionDetails: attractionDetailsReducer,
    filters: filterReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export default store;