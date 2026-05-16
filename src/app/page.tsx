import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">      
      {/* Hero Section */}
      <main className="grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          A base perfeita para o seu <br className="hidden md:block" />
          <span className="text-blue-600">próximo grande projeto</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Economize dezenas de horas com um boilerplate completo. 
          Autenticação com JWT, banco de dados configurado, rotas protegidas e design com Tailwind CSS prontos para uso.
        </p>

        <div className="flex space-x-4">
          <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 shadow-md transition">
            Começar a Codar
          </Link>
          <a href="https://github.com/seu-usuario" target="_blank" rel="noreferrer" className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 shadow-sm transition">
            Ver GitHub
          </a>
        </div>
      </main>
    </div>
  );
}