import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAttractionById, fetchEventsByAttractionId } from '../../utils/api';

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

export const fetchAttractionEventsThunk = createAsyncThunk(
  'attractionDetails/fetchAttractionEvents',
  async (id, thunkAPI) => {
    try {
      const data = await fetchEventsByAttractionId(id);
      return data._embedded?.events || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const attractionDetailsSlice = createSlice({
  name: 'attractionDetails',
  initialState: {
    attraction: null,
    events: [],
    isLoading: false,
    hasError: false,
    isLoadingEvents: false,
    hasEventsError: false,
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
      })
      .addCase(fetchAttractionEventsThunk.pending, (state) => {
        state.isLoadingEvents = true;
        state.hasEventsError = false;
      })
      .addCase(fetchAttractionEventsThunk.fulfilled, (state, action) => {
        state.isLoadingEvents = false;
        state.events = action.payload;
      })
      .addCase(fetchAttractionEventsThunk.rejected, (state) => {
        state.isLoadingEvents = false;
        state.hasEventsError = true;
      });
  },
});

export default attractionDetailsSlice.reducer;