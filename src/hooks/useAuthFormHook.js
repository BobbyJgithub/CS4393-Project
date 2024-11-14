// hooks/useAuthForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '../redux/slices/authSlice';
import { registerUser, loginUser } from '../utils/auth';

const useAuthForm = (onClose) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = isLogin 
        ? await loginUser(username, password)
        : await registerUser(username, password);
      dispatch(setUser(user));
      onClose();
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return { isLogin, username, password, setIsLogin, setUsername, setPassword, handleSubmit };
};

export default useAuthForm;