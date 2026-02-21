import { Leaf, Github } from "lucide-react";

const team = [{ name: "Jérimie Konda" }, { name: "Arun Kuganesan" }, { name: "Adel Noui" }, { name: "Gaïa Mezaïb" }];

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {team.map((member, i) => (
          <div
            key={member.name}
            className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all text-center animate-fade-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-lg font-display font-bold text-primary">{member.initials}</span>
            </div>
            <h3 className="font-display font-semibold text-sm">{member.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{member.role}</p>
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
