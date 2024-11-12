import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders input and button, and calls onSearch on button click', () => {
  const onSearchMock = jest.fn();
  const { getByPlaceholderText, getByText } = render(
    <SearchBar onSearch={onSearchMock} />
  );

  const input = getByPlaceholderText(/Search for events/i);
  const button = getByText(/Search/i);

  fireEvent.change(input, { target: { value: 'test query' } });
  fireEvent.click(button);

  expect(onSearchMock).toHaveBeenCalledWith('test query');
});