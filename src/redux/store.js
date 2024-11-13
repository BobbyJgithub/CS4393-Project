import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import eventDetailsReducer from './slices/eventDetailsSlice';
import attractionDetailsReducer from './slices/attractionDetailsSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import venueDetailsReducer from './slices/venueDetailsSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    eventDetails: eventDetailsReducer,
    attractionDetails: attractionDetailsReducer,
    filters: filterReducer,
    cart: cartReducer,
    auth: authReducer,
    venueDetails: venueDetailsReducer,
  },
});

export default store;