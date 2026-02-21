import { Leaf, Github } from "lucide-react";

const team = [
  { name: "Alice Dupont", role: "Lead Développeuse", initials: "AD" },
  { name: "Mehdi Ben Salah", role: "Data Scientist", initials: "MB" },
  { name: "Clara Zhang", role: "UX Designer", initials: "CZ" },
  { name: "Thomas Lefèvre", role: "Ingénieur Biomédical", initials: "TL" },
];

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-display font-bold text-center mb-4">
        À <span className="text-primary">propos</span>
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16 font-body">
        SurgGreen est une plateforme qui aide les professionnels de santé à réduire l'empreinte carbone
        de leurs interventions chirurgicales en proposant des alternatives durables certifiées.
      </p>

      {/* Team */}
      <h2 className="text-2xl font-display font-semibold text-center mb-8">
        Notre <span className="text-primary">équipe</span>
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
          Notre <span className="text-primary">mission</span>
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed font-body">
          Chaque année, plus de 300 millions d'interventions chirurgicales sont réalisées dans le monde.
          L'impact environnemental de ces procédures — des matériaux utilisés aux déchets générés — est rarement questionné.
          SurgGreen vise à changer cela en fournissant aux chirurgiens les données et outils nécessaires pour faire des choix
          éclairés et durables, sans jamais compromettre la sécurité des patients.
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
