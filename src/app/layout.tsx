import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProviders from "@/context/query-provider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WebPing | Native Web Push Notifications",
  description: "Lightweight full-stack implementation of browser push notifications using Web Push API, without relying on Firebase.",
  keywords: ["Next.js", "Web Push API", "Notifications API", "VAPID", "PostgreSQL", "Drizzle ORM", "Service Worker"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "dark", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-950 dark:text-zinc-50 selection:bg-indigo-500/30">
        
        <QueryProviders>
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </QueryProviders>
      </body>
    </html>
  );
}
