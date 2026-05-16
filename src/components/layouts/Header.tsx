'use client';

import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Header() {
  // 1. Adicionamos o "user" aqui na desestruturação
  const { user, isAuthenticated, isLoading, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Verificamos se o usuário tem permissão administrativa
  const isAdmin = user?.perfis.some(perfil => ['ROLE_ADMIN', 'ROLE_GESTOR'].includes(perfil));

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Boilerplate
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Início</Link>
          <Link href="/sobre" className="text-gray-600 hover:text-blue-600 font-medium">Sobre</Link>

          {!isLoading && (
            isAuthenticated ? (
              <div className="relative border-l pl-4 flex items-center">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-12 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      {/* Mostra o e-mail do usuário logado de forma elegante */}
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>

                    <Link 
                      href="/dashboard" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      Meu Painel
                    </Link>

                    {/* 3. A MÁGICA ACONTECE AQUI: Link exclusivo para Admins */}
                    {isAdmin && (
                      <Link 
                        href="/admin" 
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50"
                      >
                        Administração
                      </Link>
                    )}
                    
                    <button 
                      onClick={() => { setIsMenuOpen(false); logout(); }} 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t mt-1"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4 border-l pl-4">
                <Link href="/login" className="text-gray-600 hover:text-blue-600 font-medium">Entrar</Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition shadow-sm">Cadastre-se</Link>
              </div>
            )
          )}
        </nav>
      </div>
    </header>
  );
}