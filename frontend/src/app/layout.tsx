import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MonApp - Authentification",
  description: "Application avec système d'authentification Strapi",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
    <body className={inter.className}>
    <Header />
    <main>{children}</main>
    </body>
    </html>
  );
}