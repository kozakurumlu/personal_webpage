import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
interface Project {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  links: Array<{
    label: string;
    url: string;
  }>;
  slug: string;
}
const Projects = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const projects: Project[] = [{
    id: "1",
    title: "Active Inference Agent vs RL for Maze Task",
    date: "2025-01-01",
    tags: ["Project"],
    summary: "Developed an Active Inference agent from scratch (using just maths) and compared it to a Q-Learning agent in a maze task with increasing noise. AcI accuracy decreased slower compared to RL with noise increase.",
    links: [{
      label: "Code",
      url: "https://github.com/kozakurumlu/Active-Inference-from-Scratch"
    }],
    slug: "active-inference-vs-rl"
  }, {
    id: "2",
    title: "Liquid State Machine from Scratch",
    date: "2025-01-01",
    tags: ["Project"],
    summary: "Developed a liquid state machine (spiking neuron reservoir) from scratch and showed it increases accuracy of lightweight models as it increases dimensionality of data.",
    links: [{
      label: "Code",
      url: "https://github.com/kozakurumlu/LSM_Organoid"
    }],
    slug: "liquid-state-machine"
  }, {
    id: "3",
    title: "Automated Cervicovaginal Mucus Detection for Empowering Fertility Awareness",
    date: "2024-01-10",
    tags: ["Publication"],
    summary: "Research published in Fertility 2024 Rethinking Reproduction, exploring automated detection methods for fertility awareness applications.",
    links: [{
      label: "Paper",
      url: "https://www.tandfonline.com/doi/full/10.1080/14647273.2024.2340788#d1e2779"
    }],
    slug: "fertility-awareness-detection"
  }, {
    id: "4",
    title: "The Detection of Audio-Emotional Cues using Deep Learning",
    date: "2024-08-01",
    tags: ["Project"],
    summary: "Extracting emotional cues from audio of pedestrians to detect when mugging occurs to auto call security.",
    links: [{
      label: "Code",
      url: "https://github.com/kozakurumlu/MuggingDetection"
    }, {
      label: "Paper",
      url: "https://github.com/kozakurumlu/MuggingDetection/blob/main/The%20Detection%20of%20Audio-Emotional%20Cues%20using%20Deep%20Learning%20for%20Effective%20Pedestrian%20Stress%20Easing.pdf"
    }],
    slug: "audio-emotional-cues-detection"
  }, {
    id: "5",
    title: "Pebble - Earth Prize Runner-Up",
    date: "2024-06-01",
    tags: ["Project"],
    summary: "A decentralised GPU renting platform to utilise idle GPUs for AI training, decreasing energy consumption of server centres. Awarded Earth Prize Runner-Up 2024.",
    links: [{
      label: "News",
      url: "https://www.etoncollege.com/news-and-diary/school-news/eton-college-boys-awarded-runners-up-for-earth-prize-2024/?utm_source=Social&utm_medium=Post&utm_campaign=Environment"
    }],
    slug: "pebble-gpu-platform"
  }, {
    id: "6",
    title: "Eleos Maps",
    date: "2024-03-01",
    tags: ["Project"],
    summary: "Safety navigation algorithm using CNN-LSTM in series to analyse MET police crime data for safer route planning.",
    links: [{
      label: "News",
      url: "https://www.teensinai.com/teens-in-ai-alum-kozo-kurumlu-launches-eleos-app/"
    }, {
      label: "Code",
      url: "https://github.com/kozakurumlu/EleosMaps"
    }],
    slug: "eleos-maps"
  }, {
    id: "7",
    title: "Retrofitting Outdated Radiators with IoT",
    date: "2022-11-01",
    tags: ["Project"],
    summary: "Added smart devices to school's outdated radiators to decrease energy consumption. Won the 2022 Eton Environmental Hackathon.",
    links: [{
      label: "Demo",
      url: "https://youtu.be/q2SQzCBLAdk"
    }],
    slug: "smart-radiators-iot"
  }, {
    id: "8",
    title: "Numerically Modelling Rutherford Gold Scattering",
    date: "2022-06-01",
    tags: ["Publication"],
    summary: "Python project modelling the famous experiment with real physics for the Eton College Computational Physics Prize, Junior Winner.",
    links: [{
      label: "Code",
      url: "https://github.com/kozakurumlu/Numerically-Modelling-Rutherford-Scattering"
    }, {
      label: "Paper",
      url: "https://www.academia.edu/78749957/Numerically_Modelling_Rutherford_Scattering"
    }],
    slug: "rutherford-scattering-model"
  }, {
    id: "9",
    title: "Ophelia: Evolutionary Algorithms for Wildfire Resource Management",
    date: "2021-09-01",
    tags: ["Project"],
    summary: "Evolutionary algorithms to aid resource management during wildfires, presented at AI for Good.",
    links: [{
      label: "Talk",
      url: "https://youtu.be/JH5bICchjOg?t=4527"
    }],
    slug: "ophelia-wildfire-management"
  }];
  const allTags = Array.from(new Set(projects.flatMap(project => project.tags)));
  const filteredProjects = projects.filter(project => {
    return !selectedTag || project.tags.includes(selectedTag);
  });
  useEffect(() => {
    document.title = "Projects - Koza Kurumlu";
  }, []);
  return <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-8">
          <div className="section-label">Projects</div>
          
          <div className="max-w-2xl">
            
            <p className="text-large text-muted-foreground font-light">Research projects, publications, and experimental work.</p>
          </div>
          
          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            <Button variant={selectedTag === null ? "default" : "outline"} size="sm" onClick={() => setSelectedTag(null)} className="focus-ring">
              All
            </Button>
            {allTags.map(tag => <Button key={tag} variant={selectedTag === tag ? "default" : "outline"} size="sm" onClick={() => setSelectedTag(tag)} className="focus-ring">
                {tag}
              </Button>)}
          </div>
          
          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map(project => <article key={project.id} className="group border border-border-light p-6 transition-micro hover:bg-surface h-full flex flex-col">
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-3">
                    <Badge variant="outline" className="text-micro">
                      {project.tags[0]}
                    </Badge>
                      <time dateTime={project.date} className="text-small text-muted-foreground">
                        {new Date(project.date).getFullYear()}
                      </time>
                    </div>
                    
                    <h2 className="text-large font-medium mb-3 group-hover:text-foreground transition-micro">
                      {project.title}
                    </h2>
                    
                    <p className="text-body text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 pt-4 mt-auto">
                    {project.links.map((link, index) => <Button key={index} variant="outline" size="sm" className="focus-ring text-micro" asChild>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </Button>)}
                  </div>
                </div>
              </article>)}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Projects;