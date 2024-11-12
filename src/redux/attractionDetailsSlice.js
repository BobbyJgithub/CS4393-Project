
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAttractionById } from '../utils/api';

export const fetchAttractionDetailsThunk = createAsyncThunk(
  'attractionDetails/fetchAttractionDetails',
  async (id, thunkAPI) => {
    try {
      const data = await fetchAttractionById(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const attractionDetailsSlice = createSlice({
  name: 'attractionDetails',
  initialState: {
    attraction: null,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractionDetailsThunk.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchAttractionDetailsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.attraction = action.payload;
      })
      .addCase(fetchAttractionDetailsThunk.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default attractionDetailsSlice.reducer;