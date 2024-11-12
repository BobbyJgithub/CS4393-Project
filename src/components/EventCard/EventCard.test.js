import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventCard from './EventCard';

const eventMock = {
  id: '1',
  name: 'Test Event',
  dates: { start: { dateTime: '2024-12-01T20:00:00Z' } },
  _embedded: { venues: [{ name: 'Test Venue' }] },
};

test('renders event name, date, and location', () => {
  const { getByText } = render(
    <BrowserRouter>
      <EventCard event={eventMock} />
    </BrowserRouter>
  );

  expect(getByText(/Test Event/i)).toBeInTheDocument();
  expect(getByText(/12\/1\/2024/i)).toBeInTheDocument(); // Adjust date format if necessary
  expect(getByText(/Test Venue/i)).toBeInTheDocument();
});