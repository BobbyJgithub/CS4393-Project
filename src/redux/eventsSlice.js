// src/redux/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents } from '../utils/api';

export const fetchEventsThunk = createAsyncThunk(
  'events/fetchEvents',
  async (query, thunkAPI) => {
    try {
      const data = await fetchEvents(query);
      return data._embedded.events; // Ticketmaster API wraps events in "_embedded"
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
  reducers: {},
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

export default eventsSlice.reducer;