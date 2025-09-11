import { Button } from "@/components/ui/button";
const About = () => {
  return <section className="py-16">
      <div className="space-y-8">
        <div className="section-label">About Me</div>
        
        <div className="max-w-2xl">
          <ul className="text-body text-muted-foreground leading-relaxed mb-8 list-disc list-inside space-y-2">
            <li>Researching bio-inspired AI for generalisable intelligence with lower energy usage.</li>
            <li>Ultramarathon running, mountaineering and sidequesting as a hobby.</li>
            <li>Interview and publish articles on prominent entrepreneurs.</li>
          </ul>
          
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" size="sm" className="focus-ring" asChild>
              <a href="https://github.com/kozakurumlu" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" className="focus-ring" asChild>
              <a href="https://www.linkedin.com/in/koza-kurumlu-15428b246/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" size="sm" className="focus-ring" asChild>
              <a href="https://x.com/KozaKurumlu" target="_blank" rel="noopener noreferrer">
                X
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default About;