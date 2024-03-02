import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: process.env.APP_NAME,
  description: "Builded with nextjs and ollama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="bg-teal-800 font-mono text-teal-100">{children}</body>
    </html>
  );
}
