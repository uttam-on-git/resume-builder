'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import api from '@/lib/api';
import { z } from 'zod';

type LoginData = z.infer<z.ZodObject<{
  email: z.ZodString;
  password: z.ZodString;
}>>;

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isGuest: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  enterGuestMode: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/users/me');
      setUser(response.data?.user);
      setIsGuest(false);
    } catch {
      setUser(null);
      const guestStatus = sessionStorage.getItem('isGuest');
      if (guestStatus === 'true') {
        setIsGuest(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const enterGuestMode = () => {
    setUser(null);
    setIsGuest(true);
    setIsLoading(false);
  };

  const login = async (data: LoginData) => {
    await api.post('/users/login', data);
    await fetchUser();
    localStorage.removeItem('resumeDraft');
  };

  const logout = async () => {
    if (user) {
      localStorage.removeItem(`resumeDraft_${user.id}`);
    } else if (isGuest) {
      localStorage.removeItem('resumeDraft_guest');
    }
    
    await api.post('/users/logout');
    setUser(null);
    setIsGuest(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isGuest, login, logout, enterGuestMode, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};