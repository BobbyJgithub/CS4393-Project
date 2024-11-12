import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './eventsSlice';
import eventDetailsReducer from './eventDetailsSlice';
import attractionDetailsReducer from './attractionDetailsSlice';

const store = configureStore({
  reducer: {
    events: eventsReducer,
    eventDetails: eventDetailsReducer,
    attractionDetails: attractionDetailsReducer,
  },
});

export default store;