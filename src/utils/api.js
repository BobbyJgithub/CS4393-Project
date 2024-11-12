// src/utils/api.js

const API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();
  queryParams.append('apikey', process.env.REACT_APP_TICKETMASTER_API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value);
  });
  
  return queryParams.toString();
};

export const fetchEvents = async (query, type = 'event', filters = {}) => {
  try {
    const endpoint = type === 'event' ? 'events' : 'attractions';
    const queryString = buildQueryString({ keyword: query, ...filters });
    const response = await fetch(`${API_BASE_URL}/${endpoint}?${queryString}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const items = data._embedded?.[endpoint] || [];
    return items.map(item => ({ ...item, type }));
  } catch (error) {
    console.error('Error fetching results:', error);
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

export const fetchPopularEvents = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/events.json?sort=relevance,desc&size=5&locale=en-us&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded?.events || [];
  } catch (error) {
    console.error('Error fetching popular events:', error);
    throw error;
  }
};

export const fetchPopularAttractions = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/attractions.json?sort=relevance,desc&size=5&locale=en-us&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data._embedded?.attractions || [];
  } catch (error) {
    console.error('Error fetching popular attractions:', error);
    throw error;
  }
};