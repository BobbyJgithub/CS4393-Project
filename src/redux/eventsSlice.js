// src/redux/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../utils/api';

export const fetchEventsThunk = createAsyncThunk(
  'events/fetchEvents',
  async ({ query, type, filters }, { rejectWithValue }) => {
    try {
      const events = await fetchEvents(query, type, filters);
      return events;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    isLoading: false,
    hasError: null,
    searchTerm: '',
    totalResults: 0,
  },
  reducers: {
    clearSearchResults: (state) => {
      state.events = [];
      state.isLoading = false;
      state.hasError = false;
      state.searchTerm = '';
      state.totalResults = 0;
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
        state.totalResults = action.payload.length;
        state.searchTerm = action.meta.arg.query;
      })
      .addCase(fetchEventsThunk.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
        state.totalResults = 0;
      });
  },
});

export const { clearSearchResults } = eventsSlice.actions;

export default eventsSlice.reducer;