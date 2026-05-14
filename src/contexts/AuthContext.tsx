'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

// Tipagem dos dados que o contexto vai fornecer
interface AuthContextData {
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  // Aqui você pode adicionar os dados do usuário depois: user: UsuarioResponseDTO | null;
}

// Criando o contexto
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Verifica se o usuário já tem um token salvo ao abrir o site
  useEffect(() => {
    const token = localStorage.getItem('@Boilerplate:token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  async function login(email: string, senha: string) {
    try {
      // Faz a requisição para o seu back-end em Java
      const response = await api.post('/auth/login', { login: email, senha });
      
      // Supondo que seu back-end retorne { token: "eyJhb..." }
      const { token } = response.data;

      // Salva no navegador
      localStorage.setItem('@Boilerplate:token', token);
      
      // Avisa o React que o usuário está logado
      setIsAuthenticated(true);
      
      // Redireciona para o dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error; // Repassa o erro para a tela de login mostrar uma mensagem
    }
  }

  function logout() {
    localStorage.removeItem('@Boilerplate:token');
    setIsAuthenticated(false);
    router.push('/login'); // Manda de volta pra tela de login
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}