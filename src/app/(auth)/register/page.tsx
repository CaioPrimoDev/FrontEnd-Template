'use client';

import Link from 'next/link';
import { useRegister } from './useRegister';

export default function RegisterPage() {
  const { setName, setEmail, setCpf, setPassword, error, carregando, handleSubmit } = useRegister();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="mb-6 text-2xl font-bold text-center text-black">Criar Conta</h1>

        {error && <p className="mb-4 text-sm text-red-500 text-center">{error}</p>}

        <input 
          type="text" placeholder="Nome Completo" required onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
        />

        <input 
          type="email" placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 mt-2"
        />

        <input 
          type="text" placeholder="CPF (apenas números)" required onChange={(e) => setCpf(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 mt-2"
        />

        <input 
          type="password" placeholder="Senha" required onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400 my-2"
        />

        <button 
          type="submit" disabled={carregando}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-1"
        >
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="mt-4 text-center text-sm text-black">
          Já tem conta? <Link href="/login" className="text-blue-500 underline">Entre aqui</Link>
        </p>
      </form>
    </div>
  );
}