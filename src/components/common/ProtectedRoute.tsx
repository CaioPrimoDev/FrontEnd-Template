'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    // Se o sistema já terminou de carregar (ler o token) e o usuário NÃO está autenticado...
    if (!isLoading && !isAuthenticated) {
      // Expulsa ele de volta para a tela de login
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Enquanto estiver verificando o token, mostra uma tela de carregamento genérica
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">Verificando permissões...</p>
      </div>
    );
  }

  // Se o usuário não está autenticado, retorna nulo para não piscar a tela do dashboard antes de redirecionar
  if (!isAuthenticated) {
    return null;
  }

  // Se passou por tudo (está carregado e autenticado), libera a página!
  return <>{children}</>;
}