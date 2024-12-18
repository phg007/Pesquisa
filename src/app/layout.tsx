import type { Metadata } from "next";
import Image from 'next/image'
import "./globals.css";
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Pesquisa de Satisfação",
  description: "Mart Minas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
    <head>
      <meta name="google" content="notranslate" />
    </head>
    <body className={inter.className}>{children}</body>
  </html>
  );
}
