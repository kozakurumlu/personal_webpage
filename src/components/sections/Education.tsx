interface EducationItem {
  year: string;
  degree: string;
  institution: string;
  type?: string;
  activities?: string[];
}

const Education = () => {
  const education: EducationItem[] = [
    {
      year: "2030",
      degree: "Carnegie Mellon University",
      institution: "Pittsburgh, PA",
      activities: [
        "B.S. Electrical and Computer Engineering"
      ]
    },
    {
      year: "2025",
      degree: "Eton College",
      institution: "Windsor, UK",
      activities: [
        "Entrepreneurship Society",
        "Computer Science Society",
        "Basketball V",
        "A Levels: Maths, Further Maths, Computer Science and Physics"
      ]
    },
    {
      year: "2020",
      degree: "Summer Fields",
      institution: "Oxford, UK"
    }
  ];

  return (
    <section className="py-16">
      <div className="space-y-8">
        <div className="section-label">Education</div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-20 top-0 h-full timeline-line" />
          
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="relative flex items-start">
                {/* Year */}
                <div className="w-16 flex-shrink-0 text-small font-medium text-muted-foreground text-right">
                  {edu.year}
                  {edu.type && (
                    <div className="text-micro text-muted-foreground">
                      {edu.type}
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
                    {edu.degree}
                  </div>
                  <div className="text-small text-muted-foreground">
                    {edu.institution}
                  </div>
                  {edu.activities && (
                    <ul className="mt-2 space-y-1">
                      {edu.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="text-small text-muted-foreground flex items-start">
                          <span className="mr-2">•</span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;