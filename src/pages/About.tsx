import { Leaf } from "lucide-react";
import jeremieImg from "@/assets/jeremie.jpg";
import adelImg from "@/assets/adel.jpg";
import arunImg from "@/assets/arun.jpg";
import gaiaImg from "@/assets/gaia.png";

const team = [
  { name: "Jérémie Konda", role: "Full-Stack Engineer", image: jeremieImg },
  { name: "Arun Kuganesan", role: "ML & Quantitative", image: arunImg },
  { name: "Adel Noui", role: "Backend Engineer", image: adelImg },
  { name: "Gaïa Mezaïb", role: "Product & Design", image: gaiaImg },
];

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">

      {/* Hero / Mission */}
      <section className="mb-28">
        <span className="inline-block border border-border text-muted-foreground text-xs font-sans tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
          Mission
        </span>
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-12 items-start">
          <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-display leading-[1.1] tracking-tight">
            We're on a mission to make surgery carbon-neutral.
          </h1>
          <p className="text-muted-foreground font-sans text-base md:text-lg leading-relaxed md:pt-2">
            300M surgical procedures per year. Nobody asks what the materials cost the planet. We do.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="mb-28">
        <span className="inline-block border border-border text-muted-foreground text-xs font-sans tracking-widest uppercase px-4 py-1.5 rounded-full mb-10">
          Team
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-3xl">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-auto rounded-lg shadow-card mb-3"
              />
              <p className="text-muted-foreground font-sans text-xs tracking-wide">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="mb-28">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-16 items-start">
          <div>
            <span className="inline-block border border-border text-muted-foreground text-xs font-sans tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              The Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-display leading-[1.15] tracking-tight">
              Healthcare generates 5% of global CO2 emissions.
            </h2>
          </div>
          <div className="space-y-5 md:pt-10">
            <p className="text-muted-foreground font-sans text-base leading-relaxed">
              Most of it comes from surgical materials chosen without any environmental data. Surgeons have no tool to measure their carbon impact.
            </p>
            <p className="text-muted-foreground font-sans text-base leading-relaxed">
              SurgGreen changes that. We give surgical teams real-time, clinically validated material recommendations ranked by both performance and carbon footprint.
            </p>
          </div>
        </div>
      </section>

      {/* Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2.5 bg-stat-card text-stat-card-foreground px-6 py-3 rounded-full text-sm font-sans font-medium tracking-wide">
          HackEurope Paris 2025 &middot; CentraleSupelec &middot; Sustainability Track &middot; Sponsored by Crusoe and Anthropic
        </div>
      </div>
    </div>
  );
};

export default About;
