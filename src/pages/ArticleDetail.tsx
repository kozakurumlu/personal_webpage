import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { articlesBySlug } from "@/lib/content";
import MarkdownRenderer from "@/components/MarkdownRenderer";

const ArticleDetail = () => {
  const { slug } = useParams();

  const article = useMemo(() => (slug ? articlesBySlug[slug] : undefined), [slug]);

  useEffect(() => {
    document.title = article?.meta.title ? `${article.meta.title} - Koza Kurumlu` : "Article - Koza Kurumlu";
  }, [article?.meta.title]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="mx-auto max-w-4xl px-6 py-16">
          <Button variant="outline" className="focus-ring" asChild>
            <a href="/articles">← Back to Articles</a>
          </Button>
          <div className="mt-8 text-muted-foreground">Article not found.</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" size="sm" className="focus-ring -ml-3" asChild>
            <a href="/articles">← Back to Articles</a>
          </Button>
        </div>

        <article className="max-w-2xl">
          {/* Article header */}
          <header className="mb-12">
            <h1 className="text-display mb-6">
              {article.meta.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-small text-muted-foreground">
              {article.meta.date && (
                <time dateTime={article.meta.date}>
                  {new Date(article.meta.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {(article.meta.tags ?? []).map(tag => (
                <Badge key={tag} variant="outline" className="text-micro">
                  {tag}
                </Badge>
              ))}
            </div>
          </header>
          
          {/* Article content */}
          <MarkdownRenderer markdown={article.body} className="prose" />
        </article>

        {/* Back to articles */}
        <div className="mt-16 pt-8 border-t border-border-light">
          <Button variant="outline" className="focus-ring" asChild>
            <a href="/articles">← Back to Articles</a>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;

