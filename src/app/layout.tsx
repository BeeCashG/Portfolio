import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Er. Bikash Gupta | Creative Developer & Digital Strategist",
  description: "Experienced Digital Marketing Strategist, Professor, and Full-Stack Developer shaping modern web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-[#121212] text-white antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col selection:bg-white/30 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
