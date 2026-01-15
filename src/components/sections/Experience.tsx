interface ExperienceItem {
  year: string;
  role: string;
  organization: string;
  type?: string;
}

const Experience = () => {
  const experiences: ExperienceItem[] = [
    {
      year: "Feb 2026",
      role: "Apple ML Engineer Intern",
      organization: "Apple, Photos Intelligence Team, Cambridge, UK",
      type: "Present"
    },
    {
      year: "2024",
      role: "NeuroAI Research",
      organization: "Uni of Bath",
      type: "Present"
    },
    {
      year: "July 2025",
      role: "AI Engineer Intern",
      organization: "Luca Health"
    },
    {
      year: "Dec 2023",
      role: "Quantitative Research Intern",
      organization: "Paritra Investment Research LTD"
    },
    {
      year: "July 2023",
      role: "AI Research Intern",
      organization: "Apricity Fertility"
    },
    {
      year: "Aug 2022",
      role: "SWE Intern",
      organization: "Vestico"
    },
    {
      year: "2021",
      role: "Global Accelerator Winner",
      organization: "Teens in AI"
    }
  ];

  return (
    <section className="py-16">
      <div className="space-y-8">
        <div className="section-label">Experience</div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-20 top-0 h-full timeline-line" />
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-start">
                {/* Year */}
                <div className="w-16 flex-shrink-0 text-small font-medium text-muted-foreground text-right">
                  {exp.year}
                  {exp.type && (
                    <div className="text-micro text-muted-foreground">
                      {exp.type}
                    </div>
                  )}
                </div>
                
                {/* Timeline dot */}
                <div className="relative flex-shrink-0 ml-[13px] mr-4 mt-1.5">
                  <div className="timeline-dot relative z-10" />
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="text-body font-medium">
                    {exp.role}
                  </div>
                  <div className="text-small text-muted-foreground">
                    {exp.organization}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;