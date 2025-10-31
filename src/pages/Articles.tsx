import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useMemo, useState } from "react";
import { articles } from "@/lib/content";

interface ArticleItem {
  slug: string;
  meta: {
    title: string;
    date?: string;
    tags?: string[];
    summary?: string;
  };
}

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const items: ArticleItem[] = useMemo(() => articles as unknown as ArticleItem[], []);
  const allTags = useMemo(() => Array.from(new Set(items.flatMap(a => a.meta.tags ?? []))), [items]);
  const filteredArticles = useMemo(() =>
    items.filter(article => {
      const title = article.meta.title?.toLowerCase() ?? "";
      const summary = article.meta.summary?.toLowerCase() ?? "";
      const matchesSearch = title.includes(searchTerm.toLowerCase()) || summary.includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || (article.meta.tags ?? []).includes(selectedTag);
      return matchesSearch && matchesTag;
    })
  , [items, searchTerm, selectedTag]);

  useEffect(() => {
    document.title = "Articles - Koza Kurumlu";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          <div className="section-label">Articles</div>

          {/* Search and Filter */}
          <div className="space-y-4">
            <div className="max-w-md">
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="focus-ring"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="focus-ring"
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(tag)}
                  className="focus-ring"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Articles List */}
          <div className="space-y-6">
            {filteredArticles.map(article => (
              <article key={article.slug} className="group">
                <a
                  href={`/${article.slug}`}
                  className="block transition-micro hover:bg-surface p-6 -mx-6 rounded focus-ring"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div>
                        <h2 className="text-large font-medium group-hover:text-foreground transition-micro mb-2">
                          {article.meta.title}
                        </h2>
                        <div className="flex items-center gap-3 text-small text-muted-foreground mb-3">
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
                      </div>

                      <p className="text-body text-muted-foreground leading-relaxed">
                        {article.meta.summary}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {(article.meta.tags ?? []).map(tag => (
                          <Badge key={tag} variant="outline" className="text-micro">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex-shrink-0 text-small text-muted-foreground group-hover:text-foreground transition-micro">→</div>
                  </div>
                </a>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body text-muted-foreground">
                No articles found matching your search.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;

