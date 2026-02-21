import { Link } from "react-router-dom";
import AnimatedCounter from "@/components/AnimatedCounter";
import { ArrowRight, Leaf, BarChart3, ShieldCheck, Search, Cpu, MessageSquare } from "lucide-react";

const statCards = [
  { value: 25, suffix: "+", label: "Matériaux", sublabel: "analysés et certifiés" },
  { value: 37, suffix: "%", prefix: "−", label: "CO₂ possible", sublabel: "réduction moyenne" },
  { value: 100, suffix: "%", label: "ISO Certifiés", sublabel: "normes respectées" },
];

const steps = [
  {
    icon: Search,
    title: "Explorez",
    desc: "Parcourez notre base de données de matériaux chirurgicaux durables avec leurs empreintes carbone.",
  },
  {
    icon: Cpu,
    title: "Comparez",
    desc: "Notre IA analyse et compare les alternatives pour chaque type d'intervention chirurgicale.",
  },
  {
    icon: MessageSquare,
    title: "Décidez",
    desc: "Recevez des recommandations personnalisées et réduisez votre impact environnemental.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
            La chirurgie{" "}
            <span className="text-primary">durable</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-4 font-body">
            <span className="font-semibold text-foreground">300M</span> surgeries/year · <span className="font-semibold text-foreground">0</span> ask about carbon.
          </p>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto font-body">
            SurgGreen aide les chirurgiens à choisir des matériaux à faible empreinte carbone, sans compromettre la qualité des soins.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full font-medium text-sm hover:shadow-card-hover transition-all hover:scale-105"
            >
              Accéder au Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/materiaux"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-7 py-3 rounded-full font-medium text-sm hover:bg-accent transition-all hover:scale-105"
            >
              Explorer les matériaux
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          {statCards.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-stat-card text-stat-card-foreground rounded-2xl p-6 text-center shadow-card animate-slide-up"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="text-3xl font-display font-bold mb-1">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-sm font-semibold">{stat.label}</div>
              <div className="text-xs text-stat-card-foreground/60 mt-1">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Comment ça <span className="text-primary">marche</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow animate-slide-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-sm text-muted-foreground border-t border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-secondary" />
          <span className="font-display font-semibold text-foreground">SurgGreen</span>
        </div>
        HackEurope Paris 2025 · CentraleSupélec · Sustainability Track
      </footer>
    </div>
  );
};

export default Landing;
