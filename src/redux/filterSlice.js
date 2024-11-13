import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    type: 'attraction',
    filters: {}
  },
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    }
  }
});

export const { setType, setFilters, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
