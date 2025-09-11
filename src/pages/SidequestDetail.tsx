import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { sidequestsBySlug } from "@/lib/content";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const SidequestDetail = () => {
  const { slug } = useParams();
  const item = useMemo(() => (slug ? sidequestsBySlug[slug] : undefined), [slug]);

  useEffect(() => {
    document.title = item?.meta.title ? `${item.meta.title} - Sidequests - Koza Kurumlu` : "Sidequests - Koza Kurumlu";
  }, [item?.meta.title]);

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="mx-auto max-w-3xl px-6 py-16">
          <Button variant="outline" className="focus-ring" asChild>
            <a href="/sidequests">← Back to Sidequests</a>
          </Button>
          <div className="mt-8 text-muted-foreground">Sidequest not found.</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-8">
          {/* Back Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="focus-ring" 
            asChild
          >
            <a href="/sidequests">← Back to Sidequests</a>
          </Button>
          
          {/* Header */}
          <header className="space-y-6">
            {item.meta.image && (
              <div className="overflow-hidden rounded-lg">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={item.meta.image} 
                    alt={item.meta.title}
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-small text-muted-foreground">
                {item.meta.location && (
                  <>
                    <span>{item.meta.location}</span>
                    <span>·</span>
                  </>
                )}
                {item.meta.date && (
                  <time dateTime={item.meta.date}>
                    {new Date(item.meta.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                )}
              </div>
              
              <h1 className="text-display leading-tight">
                {item.meta.title}
              </h1>
              
              {item.meta.summary && (
                <p className="text-large text-muted-foreground font-light leading-relaxed">
                  {item.meta.summary}
                </p>
              )}
            </div>
          </header>
          
          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <MarkdownRenderer markdown={item.body} />
          </article>
          
          {/* Back Button */}
          <div className="pt-8 border-t border-border">
            <Button 
              variant="outline" 
              className="focus-ring" 
              asChild
            >
              <a href="/sidequests">← Back to Sidequests</a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SidequestDetail;

