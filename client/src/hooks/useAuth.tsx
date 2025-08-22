import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('studycove_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      // For now, create a dummy user
      const dummyUser: User = {
        id: '1',
        name: 'John Doe',
        email,
        phone: '+91 98765 43210',
        membershipType: 'monthly',
        membershipExpiry: '2024-03-15',
        joinedAt: '2023-08-15',
        isAdmin: email === 'admin@studycove.in'
      };
      
      setUser(dummyUser);
      localStorage.setItem('studycove_user', JSON.stringify(dummyUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'joinedAt' | 'isAdmin'>): Promise<void> => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        joinedAt: new Date().toISOString(),
        isAdmin: false
      };
      
      setUser(newUser);
      localStorage.setItem('studycove_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('studycove_user');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
