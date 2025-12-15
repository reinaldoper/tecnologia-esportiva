'use client';
import { AuthContextType } from '@/types/context';
import { RegisterForm } from '@/types/register';

import { createContext, useContext, useState, ReactNode } from 'react';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<RegisterForm | null>(null);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('O useAuth deve ser usado dentro do AuthProvider.');
  }
  return context;
}