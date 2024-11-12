// src/utils/api.js

const API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export const fetchEvents = async (query) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/suggest?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}&keyword=${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};

export const fetchEventById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${id}?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  };

export const fetchAttractionById = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/attractions/${id}?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching attraction details:', error);
    throw error;
  }
};

export const fetchEventsByAttractionId = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/events?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}&attractionId=${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching attraction events:', error);
    throw error;
  }
};