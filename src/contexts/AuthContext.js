import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
// Import jwt-decode using CommonJS require to avoid default-export issues
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from stored token
  useEffect(() => {
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { sub, email, role } = jwtDecode(token);
        setUser({ id: sub, email, role });
      } catch {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);
  

  // Login: store token and set user
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      console.log('Login response data:', data);
      const { token, ...userData } = data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
      }
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      return userData;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  // Logout: clear token and user
  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }

    
  };
   const register = async (email, password) => {
        try {
          // Assuming your API returns { token, id, email, role }
          const { data } = await api.post('/api/auth/register', { email, password });
          const { token, ...userData } = data;
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
          }
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setUser(userData);
          return userData;
        } catch (err) {
          throw err.response?.data || err.message;
        }
      };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  console.log('Auth context:', context); // Debugging line
  return context;
};

