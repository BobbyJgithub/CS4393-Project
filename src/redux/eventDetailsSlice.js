// src/redux/eventDetailsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEventById } from '../utils/api';

export const fetchEventDetailsThunk = createAsyncThunk(
  'eventDetails/fetchEventDetails',
  async (id, thunkAPI) => {
    try {
      const data = await fetchEventById(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const eventDetailsSlice = createSlice({
  name: 'eventDetails',
  initialState: {
    event: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEventDetailsThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchEventDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
      })
      .addCase(fetchEventDetailsThunk.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default eventDetailsSlice.reducer;