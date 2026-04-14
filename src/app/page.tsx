import fs from "fs";
import path from "path";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Skills from "@/components/Skills";
import Gallery from "@/components/Gallery";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";

export default async function Home() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  let galleryImages: string[] = [];

  try {
    if (fs.existsSync(galleryDir)) {
      galleryImages = fs.readdirSync(galleryDir)
        .filter(file => /\.(png|jpe?g|webp|avif)$/i.test(file))
        .map(file => `/gallery/${file}`);
    }
  } catch (error) {
    console.error("Error reading gallery directory:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Er. Bikash Gupta",
    url: "https://bikashgupta.com",
    jobTitle: "Creative Developer & Digital Strategist",
    description: "Experienced Digital Marketing Strategist, Professor, and Full-Stack Developer shaping modern web experiences with code and strategy.",
    image: "https://bikashgupta.com/gallery/asset1.webp",
    sameAs: [
      "https://github.com/BeeCashG",
      "https://www.bikashgupta.com"
    ]
  };

  return (
    <main id="home" className="min-h-screen bg-[#09090b] font-sans relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ScrollyCanvas />
      <Skills />
      <Gallery images={galleryImages} />
      <Projects />
      <Resume />
      <Contact />
      <BackToTop />
    </main>
  );
}
