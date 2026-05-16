import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext"; // Ajuste o caminho se necessário
import { HeaderWrapper } from "../components/layouts/HeaderWrapper"; // Ajuste o caminho se necessário

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meu Boilerplate Profissional",
  description: "Next.js + Spring Boot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* O Header agora é global! */}
            <HeaderWrapper />
            
            {/* O conteúdo de cada página entra aqui */}
            <main className="grow">
              {children}
            </main>
            
            {/* Você poderia colocar um <Footer /> aqui também futuramente */}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}