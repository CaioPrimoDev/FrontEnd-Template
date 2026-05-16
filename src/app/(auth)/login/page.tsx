'use client';

import Link from 'next/link';
import { useLogin } from './useLogin';

export default function LoginPage() {
  // Puxamos toda a inteligência do nosso Hook Local!
  const { email, setEmail, senha, setSenha, erro, carregando, handleSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo(a)</h1>
          <p className="text-gray-500 mt-2">Faça login para acessar o Boilerplate</p>
        </div>

        {erro && (
          <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
            <input
              type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit" disabled={carregando}
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {carregando ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
          
          <p className="mt-4 text-center text-sm text-black">
            Não tem conta? <Link href="/register" className="text-blue-500 underline">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}