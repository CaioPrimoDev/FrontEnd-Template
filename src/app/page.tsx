import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">      
      {/* Hero Section */}
      <main className="grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Desenvolvimento Web de <br className="hidden md:block" />
          <span className="text-blue-600">Alta Performance</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl">
          Bem-vindo ao meu ambiente de demonstração! Desenvolvo sites rápidos, landing pages otimizadas e sistemas sob medida para escalar o seu negócio, unindo design moderno e segurança avançada.
        </p>

        <div className="flex space-x-4">
          {/* Mantive o link para o /register para você poder mostrar o sistema de login funcionando no vídeo */}
          <Link href="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 shadow-md transition">
            Testar o Sistema
          </Link>
          <a href="https://www.vintepila.com.br/seu-perfil" target="_blank" rel="noreferrer" className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 shadow-sm transition">
            Contratar Serviço
          </a>
        </div>
      </main>
    </div>
  );
}