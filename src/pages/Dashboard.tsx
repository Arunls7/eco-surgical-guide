import { useState } from "react";
import { Send, Leaf, Car } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const materials = [
  { name: "Titane Grade 5", co2: 4.2, level: "medium" as const },
  { name: "Acier Inox 316L", co2: 2.1, level: "low" as const },
  { name: "PEEK", co2: 6.8, level: "high" as const },
  { name: "Polyéthylène UHMW", co2: 1.5, level: "low" as const },
  { name: "Cobalt-Chrome", co2: 5.3, level: "high" as const },
  { name: "Zircone", co2: 3.1, level: "medium" as const },
  { name: "PMMA", co2: 2.8, level: "medium" as const },
  { name: "Silicone médical", co2: 1.9, level: "low" as const },
  { name: "Alumine", co2: 3.5, level: "medium" as const },
  { name: "Hydroxyapatite", co2: 1.2, level: "low" as const },
];

const co2Colors = {
  low: "bg-co2-low text-primary-foreground",
  medium: "bg-co2-medium text-foreground",
  high: "bg-co2-high text-primary-foreground",
};

const recommendations = [
  { rank: "🥇", name: "Acier Inox 316L", co2: "2.1 kg", strength: "Haute", iso: "ISO 5832", bio: true },
  { rank: "🥈", name: "Hydroxyapatite", co2: "1.2 kg", strength: "Moyenne", iso: "ISO 13779", bio: true },
  { rank: "🥉", name: "Silicone médical", co2: "1.9 kg", strength: "Flexible", iso: "ISO 10993", bio: false },
];

type Message = { role: "user" | "bot"; content: string; recommendations?: typeof recommendations };

const initialMessages: Message[] = [
  { role: "bot", content: "Bonjour ! Je suis votre assistant SurgGreen. Posez-moi une question sur les matériaux chirurgicaux durables." },
];

const suggestions = ["Quel matériau pour une prothèse de hanche ?", "Comparer titane vs acier", "Matériaux biodégradables"];

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "medium" | "high">("all");

  const filteredMaterials = filter === "all" ? materials : materials.filter((m) => m.level === filter);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const userMsg: Message = { role: "user", content: msg };
    const botMsg: Message = {
      role: "bot",
      content: "Voici mes recommandations basées sur votre demande :",
      recommendations,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Top bar */}
      <div className="bg-card border-b border-border px-6 py-3 flex items-center gap-8">
        <div className="flex items-center gap-2 text-sm">
          <Leaf className="w-4 h-4 text-secondary" />
          <span className="text-muted-foreground">CO₂ économisé :</span>
          <span className="font-semibold text-secondary">
            <AnimatedCounter end={142} suffix=" kg" />
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Car className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Équiv. voitures :</span>
          <span className="font-semibold text-primary">
            <AnimatedCounter end={23} suffix=" trajets" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-1/4 min-w-[260px] border-r border-border bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-semibold text-sm mb-3">Filtrer par CO₂</h3>
            <div className="flex flex-wrap gap-2">
              {(["all", "low", "medium", "high"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {f === "all" ? "Tous" : f === "low" ? "🟢 Bas" : f === "medium" ? "🟡 Moyen" : "🔴 Haut"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {filteredMaterials.map((mat) => (
              <div
                key={mat.name}
                className="bg-background rounded-xl p-3 flex items-center justify-between hover:shadow-card transition-shadow cursor-pointer"
              >
                <span className="text-sm font-medium">{mat.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${co2Colors[mat.level]}`}>
                  {mat.co2} kg
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Chat */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-3 text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border-2 border-primary/20 text-foreground"
                  }`}
                >
                  <p>{msg.content}</p>
                  {msg.recommendations && (
                    <div className="mt-4 space-y-3">
                      {msg.recommendations.map((rec) => (
                        <div key={rec.name} className="bg-background rounded-xl p-4 shadow-card">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{rec.rank}</span>
                            <span className="font-display font-semibold">{rec.name}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-co2-low text-primary-foreground">
                              {rec.co2} CO₂
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                              {rec.strength}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                              {rec.iso}
                            </span>
                            {rec.bio && (
                              <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                                ♻️ Recyclable
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions */}
          <div className="px-6 pb-2 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-3 max-w-3xl mx-auto">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Posez votre question..."
                className="flex-1 bg-background rounded-xl px-4 py-3 text-sm outline-none border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <button
                onClick={() => handleSend()}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:shadow-card-hover transition-all hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
