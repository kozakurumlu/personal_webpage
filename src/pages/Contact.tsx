import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
const Contact = () => {
  useEffect(() => {
    document.title = "Contact - Koza Kurumlu";
  }, []);
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          
          
          <div className="max-w-2xl">
            <h1 className="text-display mb-6">
              Get in Touch
            </h1>
            <p className="text-large text-muted-foreground font-light mb-12">
              Interested in collaboration, research partnerships, or just want to discuss ideas? I'd love to hear from you.
            </p>
            
            {/* Contact options */}
            <div className="space-y-8">
              <div>
                <h3 className="text-large font-medium mb-4">Email</h3>
                
                <Button variant="outline" className="focus-ring" asChild>
                  <a href="mailto:kozakurumlu@gmail.com">
                    kozakurumlu@gmail.com
                  </a>
                </Button>
              </div>
              
              <div>
                
                
                
              </div>
              
              
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Contact;