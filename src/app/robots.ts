import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // Substitua pelo domínio real em produção ou use variáveis de ambiente (process.env.NEXT_PUBLIC_SITE_URL)
  const baseUrl = 'https://seu-boilerplate.com'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',       // Bloqueia os robôs de vasculharem a área admin
        '/dashboard',   // Bloqueia a área logada do usuário
        '/api',         // Bloqueia as rotas internas de API se houverem
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Aponta automaticamente para o seu sitemap
  };
}