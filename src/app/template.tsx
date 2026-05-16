// src/app/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  // Se o cliente quiser remover a animação no futuro, 
  // é só deletar esse arquivo ou remover a classe abaixo!
  return <div className="animate-page-transition">{children}</div>;
}