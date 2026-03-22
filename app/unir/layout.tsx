import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { ChatButton } from "@/components/chat/chat-button";
import { AuthProvider } from "@/lib/auth-context";
import { GoogleProvider } from "@/components/providers/google-provider"; // 👈 importa aquí
import "./globals.css";
import { cookies } from "next/headers";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Unir - Alquiler de Departamentos para Universitarios",
  description: "Encuentra el departamento perfecto cerca de tu universidad",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#E91E63",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Unir",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  const isAuthenticate = !!token

  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Unir" />
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>

          <AuthProvider>
            {/* 👇 Aquí envolvemos s con GoogleProvider */}
            <GoogleProvider>
              <Suspense fallback={null}>{children}</Suspense>
              {isAuthenticate && <ChatButton />}
            </GoogleProvider>
          </AuthProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
