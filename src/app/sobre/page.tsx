import Link from 'next/link';

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Seção 1: Introdução Pessoal / Comercial */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Sobre o Desenvolvedor & A Tecnologia
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Transformando linhas de código em soluções comerciais robustas, seguras e extremamente velozes.
          </p>
        </div>

        {/* Seção 2: Quem Sou Eu */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quem está por trás do código?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Olá! Sou desenvolvedor de software Full-Stack focado em criar ecossistemas web modernos. Meu trabalho vai além de &quot;fazer sites&quot; — eu desenvolvo estruturas completas de back-end e front-end que resolvem problemas reais de negócios, como automação de processos, gestão de usuários e integrações de pagamento seguras.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Seja para substituir um sistema local defasado ou para tirar uma nova ideia do papel, eu utilizo as ferramentas mais respeitadas do mercado mundial para garantir que o seu produto nasça pronto para escalar.
          </p>
        </div>

        {/* Seção 3: Por que esta arquitetura? (Explicando a Stack para o Cliente) */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">A Engenharia Deste Projeto</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Front-end */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">⚛️</span>
                <h3 className="font-bold text-gray-900 text-lg">Next.js & Tailwind CSS</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                O visual e a experiência do usuário são construídos com a tecnologia usada por gigantes como TikTok e Netflix. Isso garante páginas que carregam instantaneamente no celular e um design fluido e profissional.
              </p>
            </div>

            {/* Back-end */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">☕</span>
                <h3 className="font-bold text-gray-900 text-lg">Spring Boot (Java)</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                O &quot;cérebro&quot; do sistema roda em Java Spring Boot, o mesmo ecossistema utilizado por grandes bancos mundiais. Segurança contra ataques, gerenciamento de permissões (Roles) e estabilidade absoluta, sem quedas no servidor.
              </p>
            </div>

            {/* Banco de Dados */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🗄️</span>
                <h3 className="font-bold text-gray-900 text-lg">PostgreSQL & Supabase</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dados guardados de forma relacional e segura. Gerenciamento de arquivos (como fotos de produtos) integrado diretamente na nuvem com criptografia de ponta a ponta.
              </p>
            </div>

            {/* Integrações */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">💳</span>
                <h3 className="font-bold text-gray-900 text-lg">Webhooks & Gateways</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Pronto para o mercado de e-commerce. Arquitetura preparada para receber notificações automáticas em tempo real de plataformas como o Mercado Pago para liberação imediata de compras.
              </p>
            </div>

          </div>
        </div>

        {/* Seção 4: Call to Action (CTA) */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Precisa de uma solução sob medida para a sua empresa?</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Seja um sistema de agendamento, uma plataforma de vendas ou a modernização do software da sua empresa, eu posso ajudar o seu negócio a faturar mais através da tecnologia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="https://wa.me/seu-numero-aqui" 
              target="_blank" 
              rel="noreferrer" 
              className="w-full sm:w-auto bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition shadow-md"
            >
              Falar no WhatsApp
            </a>
            <Link 
              href="/" 
              className="w-full sm:w-auto text-white border border-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-500/30 transition"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}