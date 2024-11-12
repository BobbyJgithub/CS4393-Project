// src/redux/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../utils/api';

export const fetchEventsThunk = createAsyncThunk(
  'events/fetchEvents',
  async (query, thunkAPI) => {
    try {
      const data = await fetchEvents(query);
      // Combine both events and attractions from the suggest endpoint
      const suggestions = [];
      
      if (data._embedded?.events) {
        suggestions.push(...data._embedded.events.map(event => ({
          ...event,
          type: 'event'
        })));
      }
      
      if (data._embedded?.attractions) {
        suggestions.push(...data._embedded.attractions.map(attraction => ({
          ...attraction,
          type: 'attraction'
        })));
      }
      
      return suggestions;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.events = [];
      state.isLoading = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventsThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchEventsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEventsThunk.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { clearSearchResults } = eventsSlice.actions;

export default eventsSlice.reducer;