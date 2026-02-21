import { useState } from "react";
import { Leaf, Car } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const materials = [
  { name: "Titanium Grade 5", co2: 4.2, level: "medium" as const },
  { name: "Stainless Steel 316L", co2: 2.1, level: "low" as const },
  { name: "PEEK", co2: 6.8, level: "high" as const },
  { name: "UHMW Polyethylene", co2: 1.5, level: "low" as const },
  { name: "Cobalt-Chrome", co2: 5.3, level: "high" as const },
  { name: "Zirconia", co2: 3.1, level: "medium" as const },
  { name: "PMMA", co2: 2.8, level: "medium" as const },
  { name: "Medical Silicone", co2: 1.9, level: "low" as const },
  { name: "Alumina", co2: 3.5, level: "medium" as const },
  { name: "Hydroxyapatite", co2: 1.2, level: "low" as const },
];

const co2Colors = {
  low: "bg-co2-low text-primary-foreground",
  medium: "bg-co2-medium text-foreground",
  high: "bg-co2-high text-primary-foreground",
};

const recommendations = [
  { rank: "🥇", name: "Stainless Steel 316L", co2: "2.1 kg", strength: "High", iso: "ISO 5832", bio: true },
  { rank: "🥈", name: "Hydroxyapatite", co2: "1.2 kg", strength: "Medium", iso: "ISO 13779", bio: true },
  { rank: "🥉", name: "Medical Silicone", co2: "1.9 kg", strength: "Flexible", iso: "ISO 10993", bio: false },
];

type Message = { role: "user" | "bot"; content: string; recommendations?: typeof recommendations };

const initialMessages: Message[] = [
  { role: "bot", content: "Hello! I'm your SurgGreen assistant. Ask me anything about sustainable surgical materials." },
];



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
      content: "Here are my recommendations based on your request:",
      recommendations,
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col relative overflow-hidden bg-background">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(217 91% 53%), transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(173 84% 32%), transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl"
          style={{ background: 'radial-gradient(circle, hsl(217 91% 53%), transparent 70%)' }}
        />
      </div>
      {/* Top bar */}
      <div className="relative z-10 bg-card/80 backdrop-blur-sm border-b border-border/30 px-6 py-3 flex items-center gap-8">
        <div className="flex items-center gap-2 text-sm">
          <Leaf className="w-4 h-4 text-secondary" />
          <span className="text-muted-foreground">CO₂ saved:</span>
          <span className="font-semibold text-secondary">
            <AnimatedCounter end={142} suffix=" kg" />
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Car className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">Car equiv.:</span>
          <span className="font-semibold text-primary">
            <AnimatedCounter end={23} suffix=" trips" />
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-1/4 min-w-[260px] border-r border-border/30 bg-card/70 backdrop-blur-sm flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="font-display font-semibold text-sm mb-3">Filter by CO₂</h3>
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
                  {f === "all" ? "All" : f === "low" ? "🟢 Low" : f === "medium" ? "🟡 Medium" : "🔴 High"}
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

          {/* Chat input redesign */}
          <div className="px-6 pb-6">
            <div
              className="max-w-3xl mx-auto rounded-[20px] p-5 px-6 backdrop-blur-sm border border-border/40 bg-card/70"
            >
              <div className="flex items-center gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Describe your surgical need..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground text-base"
                />
                <button
                  onClick={() => handleSend()}
                  className="bg-primary text-primary-foreground rounded-xl px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="max-w-3xl mx-auto flex flex-wrap gap-2 mt-3">
              {["Hip prosthesis permanent", "Tibial plate young patient", "Absorbable sutures", "Bone graft spine fusion"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="text-xs px-3.5 py-1 rounded-[20px] bg-card border border-border text-foreground/80 hover:border-primary/40 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
