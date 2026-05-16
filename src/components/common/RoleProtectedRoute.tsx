'use client';

import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Lista de roles permitidas (ex: ['ROLE_ADMIN', 'ROLE_GESTOR'])
}

export function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Se não está logado, manda para o login
      if (!isAuthenticated) {
        router.push('/login');
        return;
      }

      // Se está logado, mas NÃO tem o perfil necessário, chuta para o dashboard comum
      const hasPermission = user?.perfis.some(role => allowedRoles.includes(role));
      
      if (!hasPermission) {
        router.push('/dashboard'); 
      }
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">Verificando credenciais de nível superior...</p>
      </div>
    );
  }

  // Verifica se o usuário tem a role necessária antes de renderizar a tela
  const hasPermission = user?.perfis.some(role => allowedRoles.includes(role));

  if (!isAuthenticated || !hasPermission) {
    return null;
  }

  return <>{children}</>;
}