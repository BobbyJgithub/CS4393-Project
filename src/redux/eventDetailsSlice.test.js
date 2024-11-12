import eventDetailsReducer, { fetchEventDetailsThunk } from './eventDetailsSlice';

const initialState = {
  event: null,
  isLoading: false,
  hasError: false,
};

test('sets loading state when fetchEventDetailsThunk is pending', () => {
  const action = { type: fetchEventDetailsThunk.pending.type };
  const state = eventDetailsReducer(initialState, action);
  expect(state.isLoading).toBe(true);
  expect(state.hasError).toBe(false);
});

test('sets event data when fetchEventDetailsThunk is fulfilled', () => {
  const mockEvent = { id: '1', name: 'Mock Event' };
  const action = { type: fetchEventDetailsThunk.fulfilled.type, payload: mockEvent };
  const state = eventDetailsReducer(initialState, action);
  expect(state.event).toEqual(mockEvent);
  expect(state.isLoading).toBe(false);
});

test('sets error state when fetchEventDetailsThunk is rejected', () => {
  const action = { type: fetchEventDetailsThunk.rejected.type };
  const state = eventDetailsReducer(initialState, action);
  expect(state.isLoading).toBe(false);
  expect(state.hasError).toBe(true);
});