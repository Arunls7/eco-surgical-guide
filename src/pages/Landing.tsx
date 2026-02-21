import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedCounter from "@/components/AnimatedCounter";
import SlotMachineSelector from "@/components/SlotMachineSelector";
import { ArrowRight, Leaf, Search, Cpu, MessageSquare, Check, Zap, Shield, FileCheck } from "lucide-react";

import heroMedicine from "@/assets/hero-surgery.jpg";
import heroF1 from "@/assets/hero-f1.jpg";
import heroAerospace from "@/assets/hero-aerospace.jpg";
import heroOrthopedics from "@/assets/hero-orthopedics.jpg";
import heroCardiology from "@/assets/hero-cardiology.jpg";
import heroDentistry from "@/assets/hero-dentistry.jpg";
import heroAutomotive from "@/assets/hero-automotive.jpg";
import heroAviation from "@/assets/hero-aviation.jpg";

const heroImages: Record<string, string> = {
  Medicine: heroMedicine,
  "Formula 1": heroF1,
  Aerospace: heroAerospace,
  Orthopedics: heroOrthopedics,
  Cardiology: heroCardiology,
  Dentistry: heroDentistry,
  Automotive: heroAutomotive,
  Aviation: heroAviation,
};

const statCards = [
  { value: 25, suffix: "+", label: "Materials", sublabel: "analyzed & certified" },
  { value: 37, suffix: "%", prefix: "−", label: "CO₂ reduction", sublabel: "average potential" },
  { value: 100, suffix: "%", label: "ISO Certified", sublabel: "standards met" },
];

const steps = [
  { icon: Search, title: "Explore", desc: "Browse our database of sustainable surgical materials with their carbon footprints." },
  { icon: Cpu, title: "Compare", desc: "Our AI analyzes and compares alternatives for each type of surgical procedure." },
  { icon: MessageSquare, title: "Decide", desc: "Receive personalized recommendations and reduce your environmental impact." },
];

const Landing = () => {
  const [currentField, setCurrentField] = useState("Medicine");

  return (
    <div className="min-h-screen bg-background">
      {/* ═══════════ SLOT MACHINE — Hero position ═══════════ */}
      <section className="relative min-h-[100vh] overflow-hidden flex flex-col">
        {/* Dynamic background images with crossfade */}
        {Object.entries(heroImages).map(([field, src]) => (
          <div
            key={field}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${src})`,
              opacity: field === currentField ? 1 : 0,
            }}
          />
        ))}
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Slot machine content on top */}
        <div className="relative z-10 flex-1 flex items-center justify-center w-full">
          <SlotMachineSelector onFieldChange={setCurrentField} variant="hero" />
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ═══════════ SURGGREEN INTRO — Previously hero ═══════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-accent border border-border text-muted-foreground text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <Leaf className="w-3.5 h-3.5 text-primary" />
            Sustainable Surgery Initiative
          </div>

          <h2 className="text-5xl md:text-7xl font-display font-bold leading-[0.9] mb-6 tracking-tight">
            Surg<span className="text-primary">Green</span>
          </h2>

          <p className="text-lg text-muted-foreground font-body max-w-xl mx-auto mb-8">
            <span className="font-semibold text-foreground">300M</span> surgeries/year.{" "}
            <span className="font-semibold text-foreground">0</span> ask about carbon.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium text-sm hover:scale-105 transition-all shadow-lg shadow-primary/30"
            >
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/materiaux"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-3.5 rounded-full font-medium text-sm hover:bg-accent transition-all"
            >
              Explore Materials
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5 max-w-3xl mx-auto">
            {statCards.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-stat-card text-stat-card-foreground rounded-2xl py-5 px-4 text-center shadow-card animate-slide-up"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="text-2xl md:text-3xl font-display font-bold mb-0.5">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>
                <div className="text-xs font-semibold">{stat.label}</div>
                <div className="text-[10px] text-stat-card-foreground/60 mt-0.5">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            How it <span className="text-primary">works</span>
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

      {/* ═══════════ SURGGREEN COMMITS ═══════════ */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="inline-block border border-border text-muted-foreground text-xs font-sans tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
              Commitment
            </span>
            <h2 className="text-3xl md:text-4xl font-display title-hero">
              <span className="text-foreground">SurgGreen takes</span>
              <br />
              <span className="text-gradient-primary">responsibility.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto items-center">
            <div className="flex flex-col items-start relative pl-4">
              <div className="absolute left-[22px] top-5 bottom-5 w-px border-l-2 border-dashed border-border" />
              {[
                { text: "Carbon footprint calculation", active: false },
                { text: "Clinical performance ranking", active: false },
                { text: "ISO 14040 LCA data", active: true },
                { text: "CSRD compliance ready", active: false },
                { text: "Real-time recommendations", active: false },
              ].map((tag) => (
                <div key={tag.text} className="flex items-center gap-3 py-3 relative z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${tag.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className={`text-sm font-sans px-3 py-1.5 rounded-full border ${tag.active ? "border-primary text-primary font-bold bg-accent" : "border-border text-muted-foreground bg-card"}`}>
                    {tag.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-[180px] h-[180px] rounded-full bg-card flex items-center justify-center shadow-card border-[3px] border-primary">
                <Leaf className="w-16 h-16 text-primary" />
              </div>
              <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-4 py-1.5 rounded-full">
                <Check className="w-3 h-3" /> Verified Green
              </span>
              <span className="inline-flex items-center text-xs font-sans text-muted-foreground border border-border px-4 py-1.5 rounded-full">
                Carbon neutral by 2030
              </span>
            </div>

            <div className="space-y-6">
              {[
                { icon: Zap, title: "Carbon Neutrality", desc: "Every material recommendation includes full lifecycle CO2 data sourced from ISO 14040 certified studies." },
                { icon: Shield, title: "Clinical Safety First", desc: "Sustainability is never prioritized over patient outcomes. All alternatives meet strict biocompatibility standards." },
                { icon: FileCheck, title: "Regulatory Compliance", desc: "Built for CSRD reporting requirements. Export-ready sustainability reports for hospital procurement teams." },
              ].map((block) => (
                <div key={block.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <block.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm mb-1">{block.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">{block.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="py-10 text-center text-sm text-muted-foreground border-t border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="w-4 h-4 text-secondary" />
          <span className="font-display font-semibold text-foreground">SurgGreen</span>
        </div>
        HackEurope Paris 2025 · CentraleSupelec · Sustainability Track
      </footer>
    </div>
  );
};

export default Landing;
