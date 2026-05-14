'use client';

import { useAuth } from '../../hooks/useAuth';

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Se você está vendo isso, o login funcionou e o Token está salvo!</p>
      
      <button 
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Sair do Sistema
      </button>
    </div>
  );
}