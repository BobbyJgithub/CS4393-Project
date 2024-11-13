
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVenueById } from '../../utils/api';

export const fetchVenueDetailsThunk = createAsyncThunk(
  'venueDetails/fetchVenueDetails',
  async (id, thunkAPI) => {
    try {
      const data = await fetchVenueById(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const venueDetailsSlice = createSlice({
  name: 'venueDetails',
  initialState: {
    venue: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenueDetailsThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchVenueDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.venue = action.payload;
      })
      .addCase(fetchVenueDetailsThunk.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default venueDetailsSlice.reducer;