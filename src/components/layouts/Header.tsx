'use client';

import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Boilerplate
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
            Início
          </Link>
          <Link href="/sobre" className="text-gray-600 hover:text-blue-600 font-medium">
            Sobre
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-4 border-l pl-4">
              <Link href="/dashboard" className="text-blue-600 hover:underline font-medium">
                Meu Painel
              </Link>
              <button 
                onClick={logout} 
                className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 border-l pl-4">
              <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">
                Entrar
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Cadastre-se
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}