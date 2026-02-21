import { useState } from "react";
import { Recycle, Leaf, ShieldCheck } from "lucide-react";

type Category = "all" | "low" | "biodegradable" | "metals" | "polymers" | "ceramics";

interface Material {
  name: string;
  co2: number;
  level: "low" | "medium" | "high";
  strength: number;
  iso: string;
  biodegradable: boolean;
  recyclable: boolean;
  category: "metals" | "polymers" | "ceramics";
}

const materialsData: Material[] = [
  { name: "Titane Grade 5", co2: 4.2, level: "medium", strength: 90, iso: "ISO 5832-3", biodegradable: false, recyclable: true, category: "metals" },
  { name: "Acier Inox 316L", co2: 2.1, level: "low", strength: 85, iso: "ISO 5832-1", biodegradable: false, recyclable: true, category: "metals" },
  { name: "PEEK", co2: 6.8, level: "high", strength: 70, iso: "ISO 10993", biodegradable: false, recyclable: false, category: "polymers" },
  { name: "Polyéthylène UHMW", co2: 1.5, level: "low", strength: 55, iso: "ISO 5834", biodegradable: false, recyclable: true, category: "polymers" },
  { name: "Cobalt-Chrome", co2: 5.3, level: "high", strength: 95, iso: "ISO 5832-4", biodegradable: false, recyclable: true, category: "metals" },
  { name: "Zircone", co2: 3.1, level: "medium", strength: 88, iso: "ISO 13356", biodegradable: false, recyclable: false, category: "ceramics" },
  { name: "PMMA", co2: 2.8, level: "medium", strength: 40, iso: "ISO 5833", biodegradable: false, recyclable: true, category: "polymers" },
  { name: "Silicone médical", co2: 1.9, level: "low", strength: 30, iso: "ISO 10993", biodegradable: false, recyclable: false, category: "polymers" },
  { name: "Alumine", co2: 3.5, level: "medium", strength: 92, iso: "ISO 6474", biodegradable: false, recyclable: false, category: "ceramics" },
  { name: "Hydroxyapatite", co2: 1.2, level: "low", strength: 35, iso: "ISO 13779", biodegradable: true, recyclable: false, category: "ceramics" },
  { name: "PLA chirurgical", co2: 0.8, level: "low", strength: 25, iso: "ISO 13781", biodegradable: true, recyclable: false, category: "polymers" },
  { name: "Magnésium AZ91", co2: 1.8, level: "low", strength: 45, iso: "ISO 5832", biodegradable: true, recyclable: true, category: "metals" },
  { name: "Tantale", co2: 4.9, level: "medium", strength: 80, iso: "ISO 13782", biodegradable: false, recyclable: true, category: "metals" },
  { name: "PGA", co2: 0.9, level: "low", strength: 20, iso: "ISO 13781", biodegradable: true, recyclable: false, category: "polymers" },
  { name: "Niobium", co2: 3.8, level: "medium", strength: 65, iso: "ISO 5832", biodegradable: false, recyclable: true, category: "metals" },
  { name: "Bioverre 45S5", co2: 2.5, level: "low", strength: 42, iso: "ISO 10993", biodegradable: true, recyclable: false, category: "ceramics" },
  { name: "ePTFE", co2: 5.1, level: "high", strength: 35, iso: "ISO 7198", biodegradable: false, recyclable: false, category: "polymers" },
  { name: "Alliage NiTi", co2: 4.5, level: "medium", strength: 75, iso: "ISO 15841", biodegradable: false, recyclable: true, category: "metals" },
  { name: "PCL", co2: 1.1, level: "low", strength: 18, iso: "ISO 13781", biodegradable: true, recyclable: false, category: "polymers" },
  { name: "Carbone pyrolytique", co2: 6.2, level: "high", strength: 50, iso: "ISO 5834", biodegradable: false, recyclable: false, category: "ceramics" },
  { name: "Chitosane", co2: 0.6, level: "low", strength: 15, iso: "ISO 10993", biodegradable: true, recyclable: false, category: "polymers" },
  { name: "Collagène bovin", co2: 0.4, level: "low", strength: 10, iso: "ISO 22442", biodegradable: true, recyclable: false, category: "polymers" },
  { name: "TCP β", co2: 1.4, level: "low", strength: 30, iso: "ISO 13175", biodegradable: true, recyclable: false, category: "ceramics" },
  { name: "Platine-Iridium", co2: 7.5, level: "high", strength: 82, iso: "ISO 5832", biodegradable: false, recyclable: true, category: "metals" },
  { name: "Polyuréthane", co2: 3.2, level: "medium", strength: 50, iso: "ISO 10993", biodegradable: false, recyclable: true, category: "polymers" },
];

const filters: { key: Category; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "low", label: "Low CO₂" },
  { key: "biodegradable", label: "Biodégradable" },
  { key: "metals", label: "Métaux" },
  { key: "polymers", label: "Polymères" },
  { key: "ceramics", label: "Céramiques" },
];

const co2Badge = {
  low: "bg-co2-low text-primary-foreground",
  medium: "bg-co2-medium text-foreground",
  high: "bg-co2-high text-primary-foreground",
};

const Materials = () => {
  const [active, setActive] = useState<Category>("all");

  const filtered = materialsData.filter((m) => {
    if (active === "all") return true;
    if (active === "low") return m.level === "low";
    if (active === "biodegradable") return m.biodegradable;
    return m.category === active;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-display font-bold mb-2">
        Base de <span className="text-primary">matériaux</span>
      </h1>
      <p className="text-muted-foreground mb-8 font-body">
        {materialsData.length} matériaux chirurgicaux analysés et certifiés.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-primary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((mat, i) => (
          <div
            key={mat.name}
            className="bg-card rounded-2xl p-5 shadow-card hover:shadow-card-hover transition-all animate-fade-in"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-display font-semibold text-sm">{mat.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${co2Badge[mat.level]}`}>
                {mat.co2} kg
              </span>
            </div>

            {/* Strength bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Résistance</span>
                <span>{mat.strength}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${mat.strength}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{mat.iso}</span>
              <div className="flex gap-1.5">
                {mat.biodegradable && (
                  <span title="Biodégradable" className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Leaf className="w-3 h-3 text-secondary" />
                  </span>
                )}
                {mat.recyclable && (
                  <span title="Recyclable" className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Recycle className="w-3 h-3 text-primary" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
