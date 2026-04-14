import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bikashgupta.com"),
  title: {
    default: "Er. Bikash Gupta | Creative Developer & Digital Strategist",
    template: "%s | Bikash Gupta"
  },
  description: "Official portfolio of Er. Bikash Gupta. Experienced Digital Marketing Strategist, Professor, and Full-Stack Developer shaping modern web experiences with code and strategy.",
  keywords: ["Bikash Gupta", "Er. Bikash Gupta", "Creative Developer", "Digital Strategist", "Full Stack Developer", "Digital Marketing Professor", "Nepal Developer", "Tech Strategy"],
  authors: [{ name: "Bikash Gupta" }],
  creator: "Bikash Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bikashgupta.com",
    title: "Er. Bikash Gupta | Creative Developer & Digital Strategist",
    description: "Shaping modern web experiences with high-end code and digital strategy.",
    siteName: "Bikash Gupta Portfolio",
    images: [{
      url: "/gallery/asset1.jpg", // Default to an existing asset if og-image is missing
      width: 1200,
      height: 630,
      alt: "Bikash Gupta Portfolio Preview"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Er. Bikash Gupta | Creative Developer & Digital Strategist",
    description: "Digital Marketing Strategist and Full-Stack Developer Portfolio.",
    images: ["/gallery/asset1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-[#121212] text-white antialiased`}>
      <body className="min-h-full flex flex-col selection:bg-white/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
