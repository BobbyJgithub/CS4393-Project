const USERS_STORAGE_KEY = 'tix_users';

const getUsers = () => JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
const saveUsers = (users) => localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

export const registerUser = (username, password) => {
  const users = getUsers();
  
  if (users.some(user => user.username === username)) {
    throw new Error('Username already exists');
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    password, // In a real app, never store plain text passwords
    favorites: [],
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);
  return { id: newUser.id, username: newUser.username };
};

export const loginUser = (username, password) => {
  const users = getUsers();
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, username: user.username };
};

export const toggleFavorite = (userId, attraction) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return [];

  const user = users[userIndex];
  user.favorites = user.favorites || [];

  const favoriteIndex = user.favorites.findIndex(fav => fav.id === attraction.id);

  if (favoriteIndex === -1) {
    user.favorites.push(attraction);
  } else {
    user.favorites.splice(favoriteIndex, 1);
  }

  saveUsers(users);
  return user.favorites;
};

export const getFavorites = (userId) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  return user?.favorites || [];
};

export const submitVerifiedFanRequest = (userId, attraction, reason) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return false;

  const user = users[userIndex];
  user.verifiedFans = user.verifiedFans || [];

  if (user.verifiedFans.some(fan => fan.id === attraction.id)) return false;

  user.verifiedFans.push({
    ...attraction,
    verifiedAt: new Date().toISOString(),
    reason
  });

  saveUsers(users);
  return true;
};

export const getVerifiedFans = (userId) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  return user?.verifiedFans || [];
};

export const isVerifiedFan = (userId, attractionId) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  return user?.verifiedFans?.some(fan => fan.id === attractionId) || false;
};

export const addPurchasedTicket = (userId, ticket) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return false;

  const user = users[userIndex];
  user.tickets = user.tickets || [];
  user.tickets.push({
    ...ticket,
    purchasedAt: new Date().toISOString()
  });

  saveUsers(users);
  return true;
};

export const getPurchasedTickets = (userId) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  return user?.tickets || [];
};