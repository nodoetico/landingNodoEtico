import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DESCRIPCION, DOMINIO, NOMBRE } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Base de las URLs absolutas de Open Graph y canonical.
  metadataBase: new URL(DOMINIO),
  title: {
    default: `${NOMBRE} - Sistemas Inteligentes | Automatización e IA`,
    template: `%s | ${NOMBRE}`,
  },
  description: DESCRIPCION,
  keywords: [
    "inteligencia artificial",
    "automatización",
    "desarrollo de software",
    "sistemas empresariales",
    "IA aplicada",
    "bots inteligentes",
    "soluciones SaaS",
    "transformación digital",
  ],
  authors: [{ name: NOMBRE }],
  creator: NOMBRE,
  publisher: NOMBRE,
  // URL canónica de la página principal.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: NOMBRE,
    title: `${NOMBRE} - Sistemas Inteligentes`,
    description: DESCRIPCION,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NOMBRE} - Sistemas Inteligentes`,
    description: DESCRIPCION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

/**
 * Configuración del viewport.
 * En Next.js 14+ `themeColor` y `colorScheme` ya NO van en `metadata`.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Colores del tema del navegador en móvil (barra de direcciones).
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

/**
 * Layout raíz de la aplicación.
 * Envuelve toda la landing y define idioma, fuentes y metadatos.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-fondo text-texto-principal antialiased">
        {children}
      </body>
    </html>
  );
}