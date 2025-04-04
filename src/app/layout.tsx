import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Add display swap for better font loading
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Add display swap for better font loading
});

export const metadata: Metadata = {
  title: "Art'Beau-Rescence - Solutions Technologiques Innovantes",
  description: "Art'Beau-Rescence est une entreprise d'innovation technologique créée par de jeunes innovateurs sénégalais pour transformer le paysage technologique africain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <ClientBody>{children}</ClientBody>
      
      {/* Defer non-critical third-party scripts */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"
        strategy="lazyOnload"
      />
    </html>
  );
}
