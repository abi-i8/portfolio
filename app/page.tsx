import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Expertise from "@/components/Expertise";
import TechMarquee from "@/components/TechMarquee";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import EveChat from "@/components/EveChat";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const marqueeItems = [
    "Creative Direction", "AI Workflows", "Photography", "Three.js & WebGL",
    "Motion Design", "Visual Branding", "Prompt Engineering", "Digital Marketing"
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abijith A R",
    "jobTitle": "Creative Media Specialist & Technologist",
    "url": "https://abi-i8.vercel.app",
    "image": "https://abi-i8.vercel.app/DP.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kochi",
      "addressRegion": "Kerala",
      "addressCountry": "IN"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "MBA in Travel & Tourism Management",
        "about": "Central University of Kerala (2023 - 2025)"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "BA in English Literature",
        "about": "Kannur University (2020 - 2023)"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "Web Based Technologies & Multimedia Applications"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "Online Learning & Multimedia Applications"
      }
    ],
    "worksFor": [
      {
        "@type": "Organization",
        "name": "WebCastle Media",
        "location": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kochi",
            "addressRegion": "Kerala",
            "addressCountry": "IN"
          }
        }
      }
    ],
    "award": [
      "Photography & Visual Narrative Distinction (X2)",
      "Creative Media & Marketing Innovation"
    ],
    "knowsAbout": [
      "AI-assisted creative production",
      "Visual Branding",
      "Three.js & WebGL development",
      "Front-end creative development",
      "After Effects & Motion Graphics",
      "Multimedia campaigns & UGC production",
      "Prompt engineering",
      "Cinematic visual production",
      "Adobe Creative Suite & Figma"
    ],
    "sameAs": [
      "https://www.linkedin.com/in/your-linkedin",
      "https://github.com/your-github",
      "https://behance.net/your-behance"
    ]
  };

  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      
      <ScrollReveal>
        <Hero />
        
        <Marquee items={marqueeItems} />
        
        <About />
        
        <hr className="hr" />
        
        <Expertise />
        
        <TechMarquee />
        
        <Experience />
        
        <hr className="hr" />
        
        <Education />
        
        <hr className="hr" />
        
        <Contact />
        
        <Footer />
      </ScrollReveal>

      <EveChat />
    </main>
  );
}
