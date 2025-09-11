interface Publication {
  title: string;
  venue: string;
  year: string;
  url: string;
}

const Publications = () => {
  const publications: Publication[] = [
    {
      title: "Automated Cervicovaginal Mucus Detection for Empowering Fertility Awareness",
      venue: "Fertility 2024 Rethinking Reproduction, 10th–13th January 2024, Edinburgh",
      year: "2024",
      url: "https://www.tandfonline.com/doi/full/10.1080/14647273.2024.2340788#d1e2779"
    }
  ];

  return (
    <section className="py-16">
      <div className="space-y-8">
        <div className="section-label">Publications</div>
        
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <div key={index} className="group">
              <a 
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-micro hover:bg-surface p-4 -mx-4 rounded focus-ring"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-body font-medium group-hover:text-foreground transition-micro">
                      {pub.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-small text-muted-foreground">
                      <span>{pub.venue}</span>
                      <span>·</span>
                      <span>{pub.year}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-small text-muted-foreground group-hover:text-foreground transition-micro">
                    →
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;