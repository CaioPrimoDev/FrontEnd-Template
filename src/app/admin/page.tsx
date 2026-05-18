'use client';

import { useEffect, useState } from 'react';
import { RoleProtectedRoute } from '../../components/common/RoleProtectedRoute';
import api from '../../services/api';

interface UsuarioListagem {
  id: number;
  cpf: string;
  email: string;
  status: boolean;
  perfis: string[]; 
}

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
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  useEffect(() => {
    async function carregarUsuarios() {
      setCarregando(true);
      try {
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
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Cabeçalho Comercial */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-1">Gestão de acessos e usuários do sistema.</p>
        </div>

        {/* NOTA DE PORTFÓLIO: Explicação de Exclusividade e Expansão */}
        <div className="bg-linear-to-r from-purple-900 to-indigo-900 text-purple-100 p-6 rounded-xl shadow-md mb-8">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h2 className="font-bold text-white text-lg">Área Restrita & Arquitetura Escalável</h2>
              <p className="text-sm text-purple-200 mt-1 leading-relaxed">
                Esta tela é <strong>exclusiva para Administradores e Gestores</strong>. O acesso é duplamente validado: no Front-end (via rotas protegidas por Roles) e no Back-end (Spring Security bloqueando as requisições na API).
              </p>
              <p className="text-sm text-purple-300 mt-2 italic">
                💡 <strong>Pronto para Expansão:</strong> Devido à estrutura modular com Spring Boot e Next.js, este painel pode ser facilmente expandido para incluir relatórios financeiros, gráficos de faturamento, logs de auditoria e controle total de permissões comerciais.
              </p>
            </div>
          </div>
        </div>

        {erro && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-100">
            {erro}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Identificador</th>
                  <th className="p-4 font-semibold">E-mail Corporativo</th>
                  <th className="p-4 font-semibold">CPF</th>
                  <th className="p-4 font-semibold">Status da Conta</th>
                  <th className="p-4 font-semibold">Nível de Acesso</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {carregando ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400 animate-pulse">
                      Sincronizando com o banco de dados...
                    </td>
                  </tr>
                ) : usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      Nenhum registro encontrado no sistema.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="p-4 text-gray-900 font-medium">Ref #{user.id}</td>
                      <td className="p-4 text-gray-700">{user.email}</td>
                      <td className="p-4 text-gray-600">{user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.status ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                          {user.status ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-1.5">
                          {user.perfis.map((perfil, index) => (
                            <span key={index} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded border border-indigo-100">
                              {perfil.replace('ROLE_', '')}
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

          {/* Controles de Paginação */}
          {!carregando && totalPaginas > 1 && (
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                Exibindo página <span className="font-semibold text-gray-900">{paginaAtual + 1}</span> de <span className="font-semibold text-gray-900">{totalPaginas}</span>
              </span>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setPaginaAtual(old => Math.max(0, old - 1))}
                  disabled={paginaAtual === 0}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setPaginaAtual(old => Math.min(totalPaginas - 1, old + 1))}
                  disabled={paginaAtual === totalPaginas - 1}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
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