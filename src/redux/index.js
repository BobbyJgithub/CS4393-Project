import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import eventDetailsReducer from './eventDetailsSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    eventDetails: eventDetailsReducer,
  },
});

export default store;