'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../services/api';

// 1. Criamos a interface para o Usuário
interface User {
  nome: string;
  email: string;
  perfis: string[];
}

// 2. Adicionamos o "user" na tipagem do Contexto
interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; 
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  // 3. Novo estado para armazenar os dados do usuário
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const loadStorageData = async () => {
      const token = localStorage.getItem('@Boilerplate:token');
      // Buscamos também os dados do usuário salvos no cache do navegador
      const storageNome = localStorage.getItem('@Boilerplate:nome');
      const storageEmail = localStorage.getItem('@Boilerplate:email');
      const storagePerfis = localStorage.getItem('@Boilerplate:perfis');
      
      if (token && storageEmail && storagePerfis && storageNome) {
        // Restauramos o estado do usuário ao recarregar a página
        setUser({ 
          nome: storageNome,
          email: storageEmail, 
          perfis: JSON.parse(storagePerfis) 
        });
        setIsAuthenticated(true);
      }
      
      setIsLoading(false);
    };

    loadStorageData();
  }, []);

  async function login(email: string, senha: string) {
    try {
      const response = await api.post('/auth/login', { login: email, senha });
      console.log(response.data)
      
      // 4. Pegamos o token, email e perfis da resposta do back-end
      // Renomeamos 'email' da resposta para 'userEmail' para não dar conflito com o parâmetro da função
      // Usa-se userEmail para deixar claro que é o email do usuário logado, e não o email que foi passado para a função de login
      const { token, email: userEmail, perfis, nome } = response.data;

      // 5. Salvamos tudo no localStorage
      localStorage.setItem('@Boilerplate:token', token);
      localStorage.setItem('@Boilerplate:email', userEmail);
      localStorage.setItem('@Boilerplate:perfis', JSON.stringify(perfis));
      localStorage.setItem('@Boilerplate:nome', nome);

      // 6. Atualizamos os estados
      setUser({ email: userEmail, perfis, nome });
      setIsAuthenticated(true);
      
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login', error);
      throw error; 
    }
  }

  function logout() {
    // 7. Limpamos TUDO no logout
    localStorage.removeItem('@Boilerplate:token');
    localStorage.removeItem('@Boilerplate:email');
    localStorage.removeItem('@Boilerplate:perfis');
    localStorage.removeItem('@Boilerplate:nome');
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login'); 
  }

  return (
    // 8. Disponibilizamos o "user" no Provider
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}