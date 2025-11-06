import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

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

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('royalBurgerUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login - will be replaced with Supabase
    const mockUser = {
      id: '1',
      email: email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('royalBurgerUser', JSON.stringify(mockUser));
    return { user: mockUser, error: null };
  };

  const signup = async (email, password, name) => {
    // Mock signup - will be replaced with Supabase
    const mockUser = {
      id: Date.now().toString(),
      email: email,
      name: name,
      createdAt: new Date().toISOString()
    };
    setUser(mockUser);
    localStorage.setItem('royalBurgerUser', JSON.stringify(mockUser));
    return { user: mockUser, error: null };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('royalBurgerUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
