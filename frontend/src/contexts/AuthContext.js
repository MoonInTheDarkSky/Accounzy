import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'client@demo.com',
    password: 'demo123',
    role: 'client',
    name: 'John Client',
    company: 'ABC Company Ltd',
    phone: '+353 1 234 5678',
    avatar: null,
  },
  {
    id: '2',
    email: 'accountant@demo.com',
    password: 'demo123',
    role: 'accountant',
    name: 'Sarah Accountant',
    company: 'O\'Connor & Partners',
    phone: '+353 1 876 5432',
    avatar: null,
  },
  {
    id: '3',
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'super_admin',
    name: 'Michael Admin',
    company: 'System Administrator',
    phone: '+353 1 555 0000',
    avatar: null,
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock login - find user in MOCK_USERS
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Welcome back!', {
        description: `Logged in as ${foundUser.name}`,
      });

      return userWithoutPassword;
    } catch (error) {
      toast.error('Login failed', {
        description: error.message,
      });
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        avatar: null,
      };

      // Remove password before storing
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Account created successfully!', {
        description: `Welcome, ${newUser.name}!`,
      });

      return userWithoutPassword;
    } catch (error) {
      toast.error('Registration failed', {
        description: error.message,
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    toast.info('Logged out successfully');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
