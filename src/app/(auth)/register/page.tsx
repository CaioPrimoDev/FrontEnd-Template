'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../services/api';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      // O seu DTO no Java deve esperar esses nomes
      await api.post('/auth/register', { 
        nome: name,
        email: email, 
        cpf: cpf,
        senha: password 
      });

      alert('Cadastro realizado com sucesso! Faça seu login.');
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao cadastrar usuário');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="mb-6 text-2xl font-bold text-center text-black">Criar Conta</h1>

        {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

        <input 
          type="text" placeholder="Nome Completo"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input 
          type="email" placeholder="E-mail"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 mt-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input 
          type="text" placeholder="CPF (apenas números)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 mt-2"
          onChange={(e) => setCpf(e.target.value)}
          required
        />

        <input 
          type="password" placeholder="Senha"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 my-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-1">
          Cadastrar
        </button>

        <p className="mt-4 text-center text-sm text-black">
          Já tem conta? <Link href="/login" className="text-blue-500 underline">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
}