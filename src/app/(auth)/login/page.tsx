'use client';

import { useState, FormEvent } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
  // Estados para guardar o que o usuário digita
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Estados para controle de tela (erro e botão carregando)
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Importando a função login do nosso Contexto
  const { login } = useAuth();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário
    setErro('');
    setCarregando(true);

    try {
      await login(email, senha);
      // Se der certo, o redirecionamento para o dashboard já acontece no AuthContext!
    } catch (error: any) {
      // Se o Spring Boot devolver erro (ex: 403), nós capturamos e mostramos na tela
      setErro(
        error.response?.data?.details || 'Erro ao fazer login. Verifique suas credenciais.'
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Container do Formulário (O "Card" branco centralizado) */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Bem-vindo(a)</h1>
          <p className="text-gray-500 mt-2 bac ">Faça login para acessar o Boilerplate</p>
        </div>

        {/* Caixinha de Erro (Só aparece se o estado "erro" tiver texto) */}
        {erro && (
          <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de E-mail */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              placeholder="seu@email.com"
              required
            />
          </div>

          {/* Campo de Senha */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botão de Submit */}
          <button
            type="submit"
            disabled={carregando}
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