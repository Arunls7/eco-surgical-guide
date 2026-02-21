import { Leaf, Github } from "lucide-react";
import jeremieImg from "@/assets/jeremie.jpg";
import adelImg from "@/assets/adel.jpg";
import arunImg from "@/assets/arun.jpg";
import gaiaImg from "@/assets/gaia.png";

const team = [
  { name: "Jérimie Konda", role: "Developer", image: jeremieImg },
  { name: "Arun Kuganesan", role: "Developer", image: arunImg },
  { name: "Adel Noui", role: "Developer", image: adelImg },
  { name: "Gaïa Mezaïb", role: "Developer", image: gaiaImg },
];

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-center mb-4">
        About <span className="text-primary">Us</span>
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 font-body">
        SurgGreen is a platform that helps healthcare professionals reduce the carbon footprint of their surgical
        procedures by offering certified sustainable alternatives.
      </p>

      {/* Team */}
      <h2 className="text-2xl font-display font-semibold text-center mb-8">
        Our <span className="text-primary">Team</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-3xl mx-auto">
        {team.map((member, i) => (
          <div
            key={member.name}
            className="hover:scale-105 transition-transform text-center animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-40 h-auto mx-auto rounded-lg shadow-md" />
            ) : (
              <div className="w-40 aspect-[3/4] mx-auto bg-card rounded-lg shadow-md flex flex-col items-center justify-center p-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl font-display font-bold text-primary">{member.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <h3 className="font-display font-semibold text-sm">{member.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="bg-card rounded-2xl p-8 shadow-card mb-12">
        <h2 className="text-xl font-display font-semibold mb-4">
          Our <span className="text-primary">Mission</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed font-body">
          Every year, over 300 million surgical procedures are performed worldwide. The environmental impact of these
          procedures — from the materials used to the waste generated — is rarely questioned. SurgGreen aims to change
          that by providing surgeons with the data and tools needed to make informed, sustainable choices without ever
          compromising patient safety.
        </p>
      </div>

      {/* Badge */}
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-stat-card text-stat-card-foreground px-6 py-3 rounded-full text-sm font-medium">
          <Leaf className="w-4 h-4 text-secondary" />
          Built at HackEurope Paris 2025 · CentraleSupélec · Sustainability Track (Crusoe)
        </div>
      </div>
    </div>
  );
};

export default About;
