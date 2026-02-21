import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Bot, Send, Stethoscope, Car, Plane, Bone, Heart, Smile, Truck, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fieldData: Record<string, { components: string[]; priorities: string[]; icon: typeof Stethoscope }> = {
  Medicine: {
    components: ["Implant", "Suture", "Bone Plate", "Joint Prosthesis", "Surgical Mesh", "Stent", "Bone Cement"],
    priorities: ["Minimum CO2", "Biodegradable", "Biocompatible", "ISO Certified", "Absorbable"],
    icon: Stethoscope,
  },
  "Formula 1": {
    components: ["Chassis Part", "Brake Disc", "Engine Mount", "Suspension Arm", "Roll Hoop"],
    priorities: ["Maximum Strength", "Lightweight", "Heat Resistant", "Recyclable", "Cost Efficient"],
    icon: Car,
  },
  Aerospace: {
    components: ["Fuselage Panel", "Turbine Blade", "Landing Gear", "Heat Shield", "Structural Frame"],
    priorities: ["Lightweight", "Maximum Strength", "Heat Resistant", "Fatigue Resistant", "Recyclable"],
    icon: Navigation,
  },
  Orthopedics: {
    components: ["Hip Prosthesis", "Knee Implant", "Spinal Cage", "Bone Screw", "Fixation Plate"],
    priorities: ["Biocompatible", "Osseointegration", "Minimum CO2", "ISO Certified", "Long Lifespan"],
    icon: Bone,
  },
  Cardiology: {
    components: ["Heart Valve", "Stent", "Pacemaker Casing", "Vascular Graft", "Catheter"],
    priorities: ["Biocompatible", "Corrosion Resistant", "Flexible", "Minimum CO2", "Absorbable"],
    icon: Heart,
  },
  Dentistry: {
    components: ["Crown", "Implant Post", "Filling", "Bridge", "Veneer"],
    priorities: ["Aesthetic", "Biocompatible", "Durable", "Minimum CO2", "ISO Certified"],
    icon: Smile,
  },
  Automotive: {
    components: ["Body Panel", "Brake Disc", "Engine Block", "Exhaust", "Gear"],
    priorities: ["Lightweight", "Recyclable", "Cost Efficient", "Heat Resistant", "Durable"],
    icon: Truck,
  },
  Aviation: {
    components: ["Wing Spar", "Cabin Panel", "Engine Nacelle", "Floor Beam", "Seat Frame"],
    priorities: ["Lightweight", "Maximum Strength", "Fatigue Resistant", "Recyclable", "Flame Retardant"],
    icon: Plane,
  },
};

const fields = Object.keys(fieldData);

const CARD_HEIGHT = 100;
const GAP = 12;

function SlotColumn({
  label,
  items,
  activeIndex,
  onChangeIndex,
  isActive,
}: {
  label: string;
  items: string[];
  activeIndex: number;
  onChangeIndex: (i: number) => void;
  isActive?: boolean;
}) {
  const scrollTo = useCallback(
    (index: number) => {
      onChangeIndex(Math.max(0, Math.min(items.length - 1, index)));
    },
    [items.length, onChangeIndex]
  );

  // Build visible: prev, current, next
  const getSlots = () => {
    const result: { text: string; position: "prev" | "center" | "next"; idx: number }[] = [];
    const prev = activeIndex - 1;
    const next = activeIndex + 1;
    if (prev >= 0) result.push({ text: items[prev], position: "prev", idx: prev });
    else result.push({ text: "", position: "prev", idx: -1 });
    result.push({ text: items[activeIndex], position: "center", idx: activeIndex });
    if (next < items.length) result.push({ text: items[next], position: "next", idx: next });
    else result.push({ text: "", position: "next", idx: -1 });
    return result;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Label */}
      <span
        className={`text-xs font-bold uppercase tracking-[0.18em] mb-4 px-3 py-1 rounded ${
          isActive
            ? "bg-primary/10 text-primary border border-primary/30"
            : "text-muted-foreground"
        }`}
      >
        {label}
      </span>

      {/* Up arrow */}
      <button
        onClick={() => scrollTo(activeIndex - 1)}
        className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent hover:border-primary/50 transition-all disabled:opacity-20 mb-3 group"
        disabled={activeIndex === 0}
        aria-label="Previous"
      >
        <ChevronUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      {/* Slot window */}
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{
          height: CARD_HEIGHT * 3 + GAP * 2 + 32,
          background: "linear-gradient(180deg, hsl(210 40% 96% / 0.7) 0%, hsl(166 50% 96% / 0.5) 100%)",
          boxShadow: "inset 0 4px 30px rgba(0,0,0,0.04)",
          perspective: "800px",
        }}
      >
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 z-30 pointer-events-none"
          style={{
            height: 40,
            background: "linear-gradient(to bottom, hsl(210 40% 96% / 0.9), transparent)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 z-30 pointer-events-none"
          style={{
            height: 40,
            background: "linear-gradient(to top, hsl(166 50% 96% / 0.9), transparent)",
          }}
        />

        {/* Cards container with 3D */}
        <div
          className="flex flex-col items-center justify-center h-full px-3 py-4"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {getSlots().map((slot) => {
            const isCenter = slot.position === "center";
            const isPrev = slot.position === "prev";
            const isNext = slot.position === "next";

            const rotateX = isPrev ? 25 : isNext ? -25 : 0;
            const translateZ = isCenter ? 30 : -10;
            const scale = isCenter ? 1 : 0.88;
            const opacity = isCenter ? 1 : slot.text ? 0.45 : 0;

            return (
              <div
                key={`${slot.position}-${slot.idx}`}
                className="w-full flex items-center justify-center transition-all duration-500 ease-out"
                style={{
                  height: CARD_HEIGHT,
                  marginBottom: slot.position !== "next" ? GAP : 0,
                  transform: `perspective(600px) rotateX(${rotateX}deg) translateZ(${translateZ}px) scale(${scale})`,
                  opacity,
                  transformOrigin: isPrev ? "bottom center" : isNext ? "top center" : "center",
                }}
              >
                <div
                  className={`w-full h-full rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isCenter
                      ? "bg-card border-2 border-primary shadow-[0_0_24px_hsl(var(--primary)/0.15),0_4px_16px_rgba(0,0,0,0.06)]"
                      : "bg-card/60 border border-border/50"
                  }`}
                >
                  <span
                    className={`text-sm transition-all duration-500 ${
                      isCenter ? "font-bold text-primary text-base" : "text-muted-foreground font-medium"
                    }`}
                  >
                    {slot.text}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Down arrow */}
      <button
        onClick={() => scrollTo(activeIndex + 1)}
        className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent hover:border-primary/50 transition-all disabled:opacity-20 mt-3 group"
        disabled={activeIndex === items.length - 1}
        aria-label="Next"
      >
        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
      </button>
    </div>
  );
}

const chatMessages = [
  { from: "bot", text: "Hello! I'm SurgGreen AI." },
  { from: "bot", text: "Select a field, component, and priority to get started." },
];

export default function SlotMachineSelector() {
  const navigate = useNavigate();
  const [fieldIndex, setFieldIndex] = useState(0);
  const [compIndex, setCompIndex] = useState(0);
  const [prioIndex, setPrioIndex] = useState(0);
  const [messages, setMessages] = useState(chatMessages);
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [activeCol, setActiveCol] = useState<number | null>(null);

  const currentField = fields[fieldIndex];
  const { components, priorities } = fieldData[currentField];

  const handleFieldChange = useCallback((i: number) => {
    setFieldIndex(i);
    setCompIndex(0);
    setPrioIndex(0);
    setActiveCol(0);
  }, []);

  const handleCompChange = useCallback((i: number) => {
    setCompIndex(i);
    setActiveCol(1);
  }, []);

  const handlePrioChange = useCallback((i: number) => {
    setPrioIndex(i);
    setActiveCol(2);
  }, []);

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

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent)" }} />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.02] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(161 93% 30%), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display title-hero text-center mb-3">
          <span className="text-gradient-primary">Find your green material</span>
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-12 font-body max-w-lg mx-auto">
          Spin the drums, pick your combination, and let our AI find the best sustainable match.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto items-start">
          {/* Slot machine frame */}
          <div
            className="rounded-3xl p-5 md:p-7"
            style={{
              background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(0 0% 95%) 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
          >
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              <SlotColumn label="Field" items={fields} activeIndex={fieldIndex} onChangeIndex={handleFieldChange} isActive={activeCol === 0} />
              <SlotColumn label="Component" items={components} activeIndex={compIndex} onChangeIndex={handleCompChange} isActive={activeCol === 1} />
              <SlotColumn label="Priority" items={priorities} activeIndex={prioIndex} onChangeIndex={handlePrioChange} isActive={activeCol === 2} />
            </div>
          </div>

          {/* Chat card */}
          <div
            className="bg-card rounded-2xl border border-border flex flex-col overflow-hidden"
            style={{
              boxShadow: "0 20px 60px rgba(37,99,235,0.08), 0 2px 8px rgba(0,0,0,0.04)",
              height: 480,
            }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center relative">
                <Bot className="w-5 h-5 text-primary" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-primary border-2 border-card animate-pulse" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm">SurgGreen AI</h3>
                <span className="text-[10px] text-muted-foreground">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      msg.from === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-accent text-accent-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-accent rounded-2xl rounded-bl-md px-4 py-2.5 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border space-y-2">
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
