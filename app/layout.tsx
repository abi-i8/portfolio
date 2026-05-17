import type { Metadata } from "next";
import { Russo_One, Exo_2, Barlow } from "next/font/google";
import "./globals.css";
import StyledJsxRegistry from "./registry";

const russo = Russo_One({ 
  subsets: ["latin"], 
  weight: "400", 
  variable: "--ru",
  display: 'swap',
});
const exo2 = Exo_2({ 
  subsets: ["latin"], 
  variable: "--ex",
  display: 'swap',
});
const barlow = Barlow({ 
  subsets: ["latin"], 
  weight: ["200", "300", "400", "500"], 
  variable: "--ba",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abi-i8.vercel.app'),
  title: {
    default: "Abijith A R | Creative Media Technologist & AI Creative Specialist",
    template: "%s | Abijith A R"
  },
  description: "Portfolio of Abijith A R - Creative Media Technologist, AI Creative Specialist, and Front-End Creative Developer in Kochi, Kerala, India. Specialize in Three.js, WebGL, visual branding, cinematic visuals, and prompt engineering.",
  keywords: [
    "Abijith A R",
    "Creative Media Technologist",
    "AI Creative Specialist",
    "Front-End Creative Developer",
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
    title: "Abijith A R | Creative Media Technologist & AI Creative Specialist",
    description: "Creative Media Technologist specializing in AI-assisted creative production, immersive Three.js digital experiences, and visual branding.",
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
    title: "Abijith A R | Creative Media Technologist",
    description: "Creative Media Technologist specializing in AI workflows, Three.js, and immersive digital experiences.",
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
      <body className={`${russo.variable} ${exo2.variable} ${barlow.variable}`}>
        <StyledJsxRegistry>
          {children}
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
