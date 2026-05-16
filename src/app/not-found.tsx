import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      <main className="grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Página não encontrada
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Ops! Parece que você se perdeu. A página que você está tentando acessar não existe ou foi movida.
        </p>

        <Link 
          href="/" 
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 shadow-md transition"
        >
          Voltar para o Início
        </Link>
      </main>
    </div>
  );
}