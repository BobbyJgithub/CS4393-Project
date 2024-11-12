
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