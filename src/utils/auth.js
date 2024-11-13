const USERS_STORAGE_KEY = 'tix_users';

export const registerUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  
  if (users.find(user => user.username === username)) {
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
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return { id: newUser.id, username: newUser.username };
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  return { id: user.id, username: user.username };
};

export const toggleFavorite = (userId, attraction) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return [];

  // Ensure user has a favorites array
  if (!users[userIndex].favorites) {
    users[userIndex].favorites = [];
  }

  const favoriteIndex = users[userIndex].favorites.findIndex(fav => fav.id === attraction.id);

  if (favoriteIndex === -1) {
    users[userIndex].favorites.push(attraction);
  } else {
    users[userIndex].favorites.splice(favoriteIndex, 1);
  }

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return users[userIndex].favorites;
};

export const getFavorites = (userId) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const user = users.find(u => u.id === userId);
  return user?.favorites || [];
};

export const submitVerifiedFanRequest = (userId, attraction, reason) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return false;

  // Initialize verifiedFans array if it doesn't exist
  if (!users[userIndex].verifiedFans) {
    users[userIndex].verifiedFans = [];
  }

  // Check if already a verified fan
  const isAlreadyVerified = users[userIndex].verifiedFans.some(fan => fan.id === attraction.id);
  if (isAlreadyVerified) return false;

  // Add to verified fans
  users[userIndex].verifiedFans.push({
    ...attraction,
    verifiedAt: new Date().toISOString(),
    reason
  });

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  return true;
};

export const getVerifiedFans = (userId) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const user = users.find(u => u.id === userId);
  return user?.verifiedFans || [];
};

export const isVerifiedFan = (userId, attractionId) => {
  const users = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
  const user = users.find(u => u.id === userId);
  return user?.verifiedFans?.some(fan => fan.id === attractionId) || false;
};