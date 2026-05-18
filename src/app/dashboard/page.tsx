'use client';

import { useAuth } from '../../hooks/useAuth';
import { ProtectedRoute } from '../../components/common/ProtectedRoute';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Olá, {user?.nome || 'Cliente'}!</h1>
              <p className="text-gray-500 mt-1">Bem-vindo à sua área segura do cliente.</p>
            </div>
            
            <button 
              onClick={logout}
              className="mt-4 md:mt-0 bg-gray-100 text-gray-700 font-medium px-5 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
            >
              Encerrar Sessão
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-blue-100 bg-blue-50/50 p-6 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2">🔒 Autenticação Robusta (JWT)</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
                Esta página está protegida por um middleware de segurança. O acesso só foi permitido porque um Token JWT válido foi identificado e processado em sua sessão.
              </p>
            </div>

            <div className="border border-gray-100 bg-gray-50/50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">🚀 Próximos Passos</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Este painel pode ser customizado para exibir históricos de compras, ingressos agendados, dados de perfil ou métricas exclusivas do usuário.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}