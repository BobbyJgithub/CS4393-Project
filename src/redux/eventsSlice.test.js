import eventsReducer, { fetchEventsThunk } from './eventsSlice';

const initialState = {
  events: [],
  isLoading: false,
  hasError: false,
};

test('sets loading state when fetchEventsThunk is pending', () => {
  const action = { type: fetchEventsThunk.pending.type };
  const state = eventsReducer(initialState, action);
  expect(state.isLoading).toBe(true);
  expect(state.hasError).toBe(false);
});

test('sets events data when fetchEventsThunk is fulfilled', () => {
  const mockEvents = [{ id: '1', name: 'Mock Event' }];
  const action = { type: fetchEventsThunk.fulfilled.type, payload: mockEvents };
  const state = eventsReducer(initialState, action);
  expect(state.events).toEqual(mockEvents);
  expect(state.isLoading).toBe(false);
});

test('sets error state when fetchEventsThunk is rejected', () => {
  const action = { type: fetchEventsThunk.rejected.type };
  const state = eventsReducer(initialState, action);
  expect(state.isLoading).toBe(false);
  expect(state.hasError).toBe(true);
});