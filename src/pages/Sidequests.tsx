import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { useEffect, useMemo } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { sidequests } from "@/lib/content";

interface SidequestItem {
  slug: string;
  meta: {
    title: string;
    date?: string;
    summary?: string;
    image?: string;
    location?: string;
  };
}

const Sidequests = () => {
  const items: SidequestItem[] = useMemo(() => sidequests as unknown as SidequestItem[], []);

  useEffect(() => {
    document.title = "Sidequests - Koza Kurumlu";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          <div className="section-label">Adventures</div>

          {/* Dictionary Definition */}
          <div className="border-l-4 border-primary/20 pl-6 py-4 bg-surface/50">
            <div className="space-y-2">
              <h2 className="text-large font-medium">Side quest</h2>
              <p className="text-small text-muted-foreground italic">
                /side kwest/ <span className="font-normal">noun</span>
              </p>
              <p className="text-body leading-relaxed">
                <strong>1.</strong> An optional adventure or mission that deviates from the main storyline, often providing unique rewards and experiences. <strong>2.</strong> In life: pursuing meaningful adventures and challenges beyond work and daily routines, contributing to personal growth and memorable experiences.
              </p>
            </div>
          </div>

          {/* Sidequests Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {items.map(sidequest => (
              <a
                key={sidequest.slug}
                href={`/sidequests/${sidequest.slug}`}
                className="group block border border-border-light transition-micro hover:bg-surface focus-ring"
              >
                <article className="space-y-4">
                  {/* Image */}
                  {sidequest.meta.image && (
                    <div className="overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={sidequest.meta.image}
                          alt={sidequest.meta.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </AspectRatio>
                    </div>
                  )}

                  <div className="p-6 space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        {sidequest.meta.location && (
                          <span className="text-micro text-muted-foreground bg-surface px-2 py-1 rounded">
                            {sidequest.meta.location}
                          </span>
                        )}
                        {sidequest.meta.date && (
                          <time dateTime={sidequest.meta.date} className="text-small text-muted-foreground">
                            {new Date(sidequest.meta.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long'
                            })}
                          </time>
                        )}
                      </div>

                      <h2 className="text-large font-medium mb-3 group-hover:text-foreground transition-micro">
                        {sidequest.meta.title}
                      </h2>

                      <p className="text-body text-muted-foreground leading-relaxed">
                        {sidequest.meta.summary}
                      </p>
                    </div>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sidequests;

