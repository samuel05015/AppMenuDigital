import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('royalBurgerUser');
    const savedToken = localStorage.getItem('royalBurgerToken');
    
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { user: null, error: error.detail || 'Login failed' };
      }

      const data = await response.json();
      
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        isAdmin: data.user.isAdmin || email === 'admin@royalburger.com',
      };

      setUser(userData);
      setToken(data.session.access_token);
      localStorage.setItem('royalBurgerUser', JSON.stringify(userData));
      localStorage.setItem('royalBurgerToken', data.session.access_token);
      
      return { user: userData, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { user: null, error: 'Failed to login. Please try again.' };
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        return { user: null, error: error.detail || 'Signup failed' };
      }

      const data = await response.json();
      
      const userData = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name || name,
        isAdmin: data.user.isAdmin || email === 'admin@royalburger.com',
      };

      setUser(userData);
      
      if (data.session?.access_token) {
        setToken(data.session.access_token);
        localStorage.setItem('royalBurgerToken', data.session.access_token);
      }
      
      localStorage.setItem('royalBurgerUser', JSON.stringify(userData));
      
      return { user: userData, error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { user: null, error: 'Failed to create account. Please try again.' };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_URL}/auth/signout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('royalBurgerUser');
      localStorage.removeItem('royalBurgerToken');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
