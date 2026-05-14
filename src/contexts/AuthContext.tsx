'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

// 1. Adicionamos o isLoading na tipagem
interface AuthContextData {
  isAuthenticated: boolean;
  isLoading: boolean; 
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 2. Começamos como "true", pois o site inicia verificando se há token
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    // 3. Função assíncrona para driblar o aviso de "setState" síncrono do React
    const loadStorageData = async () => {
      const token = localStorage.getItem('@Boilerplate:token');
      
      if (token) {
        setIsAuthenticated(true);
      }
      
      // Avisa que terminou de checar, tendo ou não o token
      setIsLoading(false);
    };

    loadStorageData();
  }, []);

  async function login(email: string, senha: string) {
    try {
      const response = await api.post('/auth/login', { login: email, senha });
      const { token } = response.data;

      localStorage.setItem('@Boilerplate:token', token);
      setIsAuthenticated(true);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error; 
    }
  }

  function logout() {
    localStorage.removeItem('@Boilerplate:token');
    setIsAuthenticated(false);
    router.push('/login'); 
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}