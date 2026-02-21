import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Bot, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fieldData: Record<string, { components: string[]; priorities: string[]; color: string }> = {
  Medicine: {
    components: ["Implant", "Suture", "Bone Plate", "Joint Prosthesis", "Surgical Mesh", "Stent", "Bone Cement"],
    priorities: ["Minimum CO2", "Biodegradable", "Biocompatible", "ISO Certified", "Absorbable"],
    color: "161 93% 30%",
  },
  "Formula 1": {
    components: ["Chassis Part", "Brake Disc", "Engine Mount", "Suspension Arm", "Roll Hoop"],
    priorities: ["Maximum Strength", "Lightweight", "Heat Resistant", "Recyclable", "Cost Efficient"],
    color: "0 84% 50%",
  },
  Aerospace: {
    components: ["Fuselage Panel", "Turbine Blade", "Landing Gear", "Heat Shield", "Structural Frame"],
    priorities: ["Lightweight", "Maximum Strength", "Heat Resistant", "Fatigue Resistant", "Recyclable"],
    color: "220 70% 50%",
  },
  Orthopedics: {
    components: ["Hip Prosthesis", "Knee Implant", "Spinal Cage", "Bone Screw", "Fixation Plate"],
    priorities: ["Biocompatible", "Osseointegration", "Minimum CO2", "ISO Certified", "Long Lifespan"],
    color: "280 60% 50%",
  },
  Cardiology: {
    components: ["Heart Valve", "Stent", "Pacemaker Casing", "Vascular Graft", "Catheter"],
    priorities: ["Biocompatible", "Corrosion Resistant", "Flexible", "Minimum CO2", "Absorbable"],
    color: "340 75% 55%",
  },
  Dentistry: {
    components: ["Crown", "Implant Post", "Filling", "Bridge", "Veneer"],
    priorities: ["Aesthetic", "Biocompatible", "Durable", "Minimum CO2", "ISO Certified"],
    color: "45 90% 48%",
  },
  Automotive: {
    components: ["Body Panel", "Brake Disc", "Engine Block", "Exhaust", "Gear"],
    priorities: ["Lightweight", "Recyclable", "Cost Efficient", "Heat Resistant", "Durable"],
    color: "25 85% 50%",
  },
  Aviation: {
    components: ["Wing Spar", "Cabin Panel", "Engine Nacelle", "Floor Beam", "Seat Frame"],
    priorities: ["Lightweight", "Maximum Strength", "Fatigue Resistant", "Recyclable", "Flame Retardant"],
    color: "200 75% 45%",
  },
};

const fields = Object.keys(fieldData);

function SlotColumn({
  label,
  items,
  activeIndex,
  onChangeIndex,
  accentColor,
}: {
  label: string;
  items: string[];
  activeIndex: number;
  onChangeIndex: (i: number) => void;
  accentColor: string;
}) {
  const scrollTo = useCallback(
    (index: number) => {
      onChangeIndex(Math.max(0, Math.min(items.length - 1, index)));
    },
    [items.length, onChangeIndex]
  );

  const prev = activeIndex - 1;
  const next = activeIndex + 1;

  return (
    <div className="flex flex-col items-center">
      {/* Label */}
      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
        {label}
      </span>

      {/* Up arrow */}
      <button
        onClick={() => scrollTo(activeIndex - 1)}
        className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 transition-all disabled:opacity-20 mb-2"
        disabled={activeIndex === 0}
      >
        <ChevronUp className="w-4 h-4 text-muted-foreground" />
      </button>

      {/* Slot window */}
      <div className="w-full flex flex-col gap-2">
        {/* Previous item */}
        <div className="h-14 rounded-xl bg-muted/30 flex items-center justify-center transition-all duration-400">
          <span className="text-xs text-muted-foreground/50 font-medium">
            {prev >= 0 ? items[prev] : ""}
          </span>
        </div>

        {/* Active item */}
        <div
          className="h-20 rounded-xl flex items-center justify-center transition-all duration-500 relative"
          style={{
            background: `linear-gradient(135deg, hsl(${accentColor} / 0.08) 0%, hsl(${accentColor} / 0.03) 100%)`,
            border: `2px solid hsl(${accentColor})`,
            boxShadow: `0 0 20px hsl(${accentColor} / 0.12), 0 4px 12px rgba(0,0,0,0.04)`,
          }}
        >
          <span
            className="text-sm font-bold transition-all duration-500"
            style={{ color: `hsl(${accentColor})` }}
          >
            {items[activeIndex]}
          </span>
        </div>

        {/* Next item */}
        <div className="h-14 rounded-xl bg-muted/30 flex items-center justify-center transition-all duration-400">
          <span className="text-xs text-muted-foreground/50 font-medium">
            {next < items.length ? items[next] : ""}
          </span>
        </div>
      </div>

      {/* Down arrow */}
      <button
        onClick={() => scrollTo(activeIndex + 1)}
        className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/40 transition-all disabled:opacity-20 mt-2"
        disabled={activeIndex === items.length - 1}
      >
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
    </div>
  );
}

const chatMessages = [
  { from: "bot", text: "Hello! I'm SurgGreen AI." },
  { from: "bot", text: "Select a field, component, and priority to get started." },
];

export const fieldNames = fields;

export default function SlotMachineSelector({ onFieldChange, variant = "default" }: { onFieldChange?: (field: string) => void; variant?: "default" | "hero" }) {
  const navigate = useNavigate();
  const [fieldIndex, setFieldIndex] = useState(0);
  const [compIndex, setCompIndex] = useState(0);
  const [prioIndex, setPrioIndex] = useState(0);
  const [messages, setMessages] = useState(chatMessages);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentField = fields[fieldIndex];
  const { components, priorities, color } = fieldData[currentField];

  const handleFieldChange = useCallback((i: number) => {
    setFieldIndex(i);
    setCompIndex(0);
    setPrioIndex(0);
    onFieldChange?.(fields[i]);
  }, [onFieldChange]);

  const selectedComponent = components[compIndex] || components[0];
  const selectedPriority = priorities[prioIndex] || priorities[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectionText = `${currentField} / ${selectedComponent} / ${selectedPriority}`;

  const handleAnalyze = () => {
    const query = `Find me a sustainable material for ${currentField}, component: ${selectedComponent}, priority: ${selectedPriority}`;
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "user", text: query }]);
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", text: "Analyzing... Redirecting to dashboard." }]);
        setTyping(false);
        setTimeout(() => navigate("/dashboard", { state: { prefill: query } }), 800);
      }, 600);
    }, 200);
  };

  const isHero = variant === "hero";

  return (
    <section className={`py-14 relative overflow-hidden ${isHero ? "" : ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className={`text-3xl md:text-4xl font-display title-hero mb-3 ${isHero ? "text-white drop-shadow-lg" : ""}`}>
            {isHero ? (
              <span className="text-white">Find your <span className="text-primary">green</span> material</span>
            ) : (
              <span className="text-gradient-primary">Find your green material</span>
            )}
          </h2>
          <p className={`text-sm font-body max-w-md mx-auto ${isHero ? "text-white/70" : "text-muted-foreground"}`}>
            Spin the drums, pick your combination, and let our AI find the best sustainable match.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 max-w-5xl mx-auto items-start">
          {/* Slot machine */}
          <div
            className="rounded-2xl p-6 border border-border/50"
            style={{
              background: "linear-gradient(160deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
            }}
          >
            <div className="grid grid-cols-3 gap-4">
              <SlotColumn label="Field" items={fields} activeIndex={fieldIndex} onChangeIndex={handleFieldChange} accentColor={color} />
              <SlotColumn label="Component" items={components} activeIndex={compIndex} onChangeIndex={setCompIndex} accentColor={color} />
              <SlotColumn label="Priority" items={priorities} activeIndex={prioIndex} onChangeIndex={setPrioIndex} accentColor={color} />
            </div>
          </div>

          {/* Chat */}
          <div
            className="bg-card rounded-2xl border border-border flex flex-col overflow-hidden"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
              minHeight: 380,
              maxHeight: 420,
            }}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center relative">
                <Bot className="w-4 h-4 text-primary" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-card animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm leading-tight">SurgGreen AI</h3>
                <span className="text-[10px] text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-1.5 text-xs leading-relaxed ${
                      msg.from === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-accent text-accent-foreground rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-accent rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Footer */}
            <div className="px-3 py-3 border-t border-border space-y-1.5">
              <div className="text-[10px] text-muted-foreground text-center truncate">{selectionText}</div>
              <button
                onClick={handleAnalyze}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-full text-xs font-medium hover:shadow-card-hover transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                Analyze this combination
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
