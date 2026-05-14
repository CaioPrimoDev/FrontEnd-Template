import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext"; // Importe o Provider

export const metadata: Metadata = {
  title: "Meu Boilerplate Freelancer",
  description: "Sistema incrível feito com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Tudo dentro do Provider terá acesso ao login/logout */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}