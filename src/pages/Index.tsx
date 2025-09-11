import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Publications from "@/components/sections/Publications";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Update document title and meta description
    document.title = "Koza Kurumlu - Researcher & Engineer";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Koza Kurumlu - Researcher exploring technology, human behavior, and sustainable systems. Publications, projects, and insights on AI, HCI, and sustainable computing.');
    }
    
    // OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Koza Kurumlu - Researcher & Engineer');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Researcher exploring technology, human behavior, and sustainable systems. Publications, projects, and insights on AI, HCI, and sustainable computing.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-4xl px-6">
        <Hero />
        
        {/* Subtle separator */}
        <div className="h-px bg-border-light" />
        
        <About />
        
        {/* Subtle separator */}
        <div className="h-px bg-border-light" />
        
        <Experience />
        
        {/* Subtle separator */}
        <div className="h-px bg-border-light" />
        
        <Education />
        
        {/* Subtle separator */}
        <div className="h-px bg-border-light" />
        
        <Publications />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
