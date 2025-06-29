// src/utils/api.js

const API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();
  queryParams.append('apikey', process.env.REACT_APP_TICKETMASTER_API_KEY);
  queryParams.append('locale', '*');  // Add default locale
  
  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== 'keyword') queryParams.append(key, value);  // Apply non-empty filters
  });
  
  if (params.keyword) {
    queryParams.append('keyword', params.keyword);
  }
  
  return queryParams.toString();
};

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchEvents = async (query = '', type = '', filters = {}) => {
  try {
    if (!query && Object.values(filters).every(v => !v)) {
      return [];
    }

    if (type === '') {
      const [eventsResponse, attractionsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/events?${buildQueryString({ keyword: query, ...filters })}`),
        fetch(`${API_BASE_URL}/attractions?${buildQueryString({ keyword: query, ...filters })}`)
      ]);

      const [eventsData, attractionsData] = await Promise.all([
        handleResponse(eventsResponse),
        handleResponse(attractionsResponse)
      ]);

      const events = eventsData._embedded?.events || [];
      const attractions = attractionsData._embedded?.attractions || [];

      return [
        ...events.map(item => ({ ...item, type: 'event' })),
        ...attractions.map(item => ({ ...item, type: 'attraction' }))
      ];
    }

    const endpoint = type === 'event' ? 'events' : 'attractions';
    const response = await fetch(`${API_BASE_URL}/${endpoint}?${buildQueryString({ keyword: query, ...filters })}`);
    const data = await handleResponse(response);
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
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching event details:', error);
    throw error;
  }
};

export const fetchAttractionById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/attractions/${id}.json?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching attraction details:', error);
    throw error;
  }
};

export const fetchEventsByAttractionId = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/events?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}&attractionId=${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching attraction events:', error);
    throw error;
  }
};

export const fetchPopularEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events.json?sort=relevance,desc&size=20&locale=en-us&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`);
    const data = await handleResponse(response);
    return data._embedded?.events || [];
  } catch (error) {
    console.error('Error fetching popular events:', error);
    throw error;
  }
};

export const fetchPopularAttractions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/attractions.json?sort=relevance,desc&size=20&locale=en-us&apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`);
    const data = await handleResponse(response);
    return data._embedded?.attractions || [];
  } catch (error) {
    console.error('Error fetching popular attractions:', error);
    throw error;
  }
};

export const fetchVenueById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/venues/${id}?apikey=${process.env.REACT_APP_TICKETMASTER_API_KEY}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching venue details:', error);
    throw error;
  }
};