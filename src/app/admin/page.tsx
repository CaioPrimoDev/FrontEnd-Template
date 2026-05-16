'use client';

import { useEffect, useState } from 'react';
import { RoleProtectedRoute } from '../../components/common/RoleProtectedRoute';
import api from '../../services/api';

// 1. Tipagem que reflete o seu UsuarioListagemDTO do Java
interface UsuarioListagem {
  id: number;
  cpf: string;
  email: string;
  status: boolean;
  perfis: string[]; 
}

// 2. Tipagem da Página do Spring Boot
interface SpringPage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function AdminPage() {
  const [usuarios, setUsuarios] = useState<UsuarioListagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  // 1. ESTADOS PARA A PAGINAÇÃO
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // Busca os usuários assim que a página carregar
  useEffect(() => {
    async function carregarUsuarios() {
      setCarregando(true); // Fica carregando ao trocar de página
      try {
        // Passamos a variável paginaAtual para a URL
        const response = await api.get<SpringPage<UsuarioListagem>>(`/usuarios/findall?page=${paginaAtual}&size=5`);
        
        setUsuarios(response.data.content);
        setTotalPaginas(response.data.totalPages);
      } catch (err) {
        console.error(err);
        setErro('Não foi possível carregar a lista de usuários.');
      } finally {
        setCarregando(false);
      }
    }

    carregarUsuarios();
  }, [paginaAtual]);

  return (
    <RoleProtectedRoute allowedRoles={['ROLE_ADMIN', 'ROLE_GESTOR']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Usuários</h1>
          <p className="text-gray-600">Área restrita para administração do sistema.</p>
        </div>

        {erro && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {erro}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold">ID</th>
                  <th className="p-4 font-semibold">E-mail</th>
                  <th className="p-4 font-semibold">CPF</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold">Perfis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {carregando ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500 animate-pulse">
                      Carregando usuários...
                    </td>
                  </tr>
                ) : usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-500">
                      Nenhum usuário encontrado.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 text-gray-900 font-medium">#{user.id}</td>
                      <td className="p-4 text-gray-700">{user.email}</td>
                      <td className="p-4 text-gray-600">{user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {user.status ? 'ATIVO' : 'INATIVO'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          {user.perfis.map((perfil, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">
                              {perfil}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* 3. CONTROLES DE PAGINAÇÃO */}
          {!carregando && totalPaginas > 1 && (
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
              <span className="text-sm text-gray-600">
                Página <span className="font-semibold text-gray-900">{paginaAtual + 1}</span> de <span className="font-semibold text-gray-900">{totalPaginas}</span>
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setPaginaAtual(old => Math.max(0, old - 1))}
                  disabled={paginaAtual === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setPaginaAtual(old => Math.min(totalPaginas - 1, old + 1))}
                  disabled={paginaAtual === totalPaginas - 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </RoleProtectedRoute>
  );
}