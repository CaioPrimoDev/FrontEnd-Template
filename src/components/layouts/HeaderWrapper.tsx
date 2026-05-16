'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';

export function HeaderWrapper() {
  // Pega a URL atual que o usuário está acessando
  const pathname = usePathname();

  // Lista de rotas onde o Header NÃO deve aparecer
  const rotasSemHeader = ['/login', '/register'];

  // Se a rota atual estiver na lista, retorna nulo (não desenha nada)
  if (rotasSemHeader.includes(pathname)) {
    return null;
  }

  // Caso contrário, desenha o Header normalmente!
  return <Header />;
}