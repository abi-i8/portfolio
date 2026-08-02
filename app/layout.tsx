import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";

const outfit = Outfit({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-outfit",
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600"], 
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abi-i8.vercel.app'),
  title: {
    default: "Abijith A R | Creative Media Specialist & Software Engineer",
    template: "%s | Abijith A R"
  },
  description: "Portfolio of Abijith A R - Creative Media Specialist and Software Engineer in Kochi, Kerala, India. Specialize in Three.js, WebGL, AI creative production, cross-platform app development, and visual branding.",
  keywords: [
    "Abijith A R",
    "Creative Media Specialist",
    "Software Engineer",
    "Front-End Developer",
    "Kochi Developer",
    "Three.js Portfolio",
    "WebGL Portfolio",
    "Prompt Engineering",
    "Kerala Developers",
    "Visual Branding Kochi"
  ],
  authors: [{ name: "Abijith A R" }],
  creator: "Abijith A R",
  publisher: "Abijith A R",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Abijith A R | Creative Media Specialist & Software Engineer",
    description: "Creative Media Specialist and Software Engineer specializing in AI-assisted creative production, immersive Three.js digital experiences, and cross-platform app development.",
    url: "https://abi-i8.vercel.app",
    siteName: "Abijith A R Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abijith A R - Creative Media Technologist & AI Creative Specialist Portfolio Preview",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Abijith A R | Creative Media Specialist & Software Engineer",
    description: "Creative Media Specialist and Software Engineer specializing in AI workflows, Three.js, and immersive digital experiences.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }} suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable}`}>
        <StyledJsxRegistry>
          {children}
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
