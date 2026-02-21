import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, Bot, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fieldData: Record<string, { components: string[]; priorities: string[] }> = {
  Medicine: {
    components: ["Implant", "Suture", "Bone Plate", "Joint Prosthesis", "Surgical Mesh", "Stent", "Bone Cement"],
    priorities: ["Minimum CO2", "Biodegradable", "Biocompatible", "ISO Certified", "Absorbable"],
  },
  "Formula 1": {
    components: ["Chassis Part", "Brake Disc", "Engine Mount", "Suspension Arm", "Roll Hoop"],
    priorities: ["Maximum Strength", "Lightweight", "Heat Resistant", "Recyclable", "Cost Efficient"],
  },
  Aerospace: {
    components: ["Fuselage Panel", "Turbine Blade", "Landing Gear", "Heat Shield", "Structural Frame"],
    priorities: ["Lightweight", "Maximum Strength", "Heat Resistant", "Fatigue Resistant", "Recyclable"],
  },
  Orthopedics: {
    components: ["Hip Prosthesis", "Knee Implant", "Spinal Cage", "Bone Screw", "Fixation Plate"],
    priorities: ["Biocompatible", "Osseointegration", "Minimum CO2", "ISO Certified", "Long Lifespan"],
  },
  Cardiology: {
    components: ["Heart Valve", "Stent", "Pacemaker Casing", "Vascular Graft", "Catheter"],
    priorities: ["Biocompatible", "Corrosion Resistant", "Flexible", "Minimum CO2", "Absorbable"],
  },
  Dentistry: {
    components: ["Crown", "Implant Post", "Filling", "Bridge", "Veneer"],
    priorities: ["Aesthetic", "Biocompatible", "Durable", "Minimum CO2", "ISO Certified"],
  },
  Automotive: {
    components: ["Body Panel", "Brake Disc", "Engine Block", "Exhaust", "Gear"],
    priorities: ["Lightweight", "Recyclable", "Cost Efficient", "Heat Resistant", "Durable"],
  },
  Aviation: {
    components: ["Wing Spar", "Cabin Panel", "Engine Nacelle", "Floor Beam", "Seat Frame"],
    priorities: ["Lightweight", "Maximum Strength", "Fatigue Resistant", "Recyclable", "Flame Retardant"],
  },
};

const fields = Object.keys(fieldData);

const ITEM_HEIGHT = 60;

function SlotColumn({
  label,
  items,
  activeIndex,
  onChangeIndex,
  delay = 0,
}: {
  label: string;
  items: string[];
  activeIndex: number;
  onChangeIndex: (i: number) => void;
  delay?: number;
}) {
  const scrollTo = useCallback(
    (index: number) => {
      onChangeIndex(Math.max(0, Math.min(items.length - 1, index)));
    },
    [items.length, onChangeIndex]
  );

  const getVisibleItems = () => {
    const result: { text: string; offset: number; key: string }[] = [];
    for (let offset = -2; offset <= 2; offset++) {
      const idx = activeIndex + offset;
      if (idx >= 0 && idx < items.length) {
        result.push({ text: items[idx], offset, key: `${idx}-${items[idx]}` });
      } else {
        result.push({ text: "", offset, key: `empty-${offset}` });
      }
    }
    return result;
  };

  const getItemStyle = (offset: number) => {
    const absOffset = Math.abs(offset);
    const rotateX = offset * -20;
    const translateZ = absOffset === 0 ? 40 : absOffset === 1 ? 10 : -20;
    const translateY = offset * 8;
    const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.6 : 0.25;
    const scale = absOffset === 0 ? 1.08 : absOffset === 1 ? 0.92 : 0.8;

    return {
      transform: `perspective(400px) rotateX(${rotateX}deg) translateZ(${translateZ}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      height: ITEM_HEIGHT,
      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  };

  return (
    <div className="flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>

      <button
        onClick={() => scrollTo(activeIndex - 1)}
        className="w-9 h-9 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center hover:bg-accent hover:border-primary transition-all disabled:opacity-20 hover:scale-110"
        disabled={activeIndex === 0}
        aria-label="Previous"
      >
        <ChevronUp className="w-4 h-4 text-primary" />
      </button>

      <div
        className="relative overflow-hidden rounded-2xl w-full"
        style={{
          height: ITEM_HEIGHT * 3 + 24,
          background: "linear-gradient(135deg, hsl(214 100% 97%) 0%, hsl(166 76% 97%) 100%)",
          boxShadow: "inset 0 2px 20px rgba(0,0,0,0.06), 0 4px 24px rgba(37,99,235,0.08)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[hsl(214,100%,97%)] to-transparent z-20 pointer-events-none rounded-t-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[hsl(166,76%,97%)] to-transparent z-20 pointer-events-none rounded-b-2xl" />

        <div
          className="absolute inset-x-2 z-10 rounded-xl pointer-events-none"
          style={{
            top: ITEM_HEIGHT + 8,
            height: ITEM_HEIGHT + 8,
            background: "hsl(var(--card))",
            border: "2px solid hsl(var(--primary))",
            boxShadow: "0 0 20px hsl(var(--primary) / 0.2), 0 0 40px hsl(var(--primary) / 0.08)",
          }}
        />

        <div className="flex flex-col items-center justify-center h-full py-3" style={{ perspective: "500px" }}>
          {getVisibleItems().map((item) => (
            <div key={item.key} className="flex items-center justify-center w-full" style={getItemStyle(item.offset)}>
              <span className={`text-sm whitespace-nowrap ${item.offset === 0 ? "font-bold text-primary" : "text-muted-foreground"}`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollTo(activeIndex + 1)}
        className="w-9 h-9 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center hover:bg-accent hover:border-primary transition-all disabled:opacity-20 hover:scale-110"
        disabled={activeIndex === items.length - 1}
        aria-label="Next"
      >
        <ChevronDown className="w-4 h-4 text-primary" />
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

  const currentField = fields[fieldIndex];
  const { components, priorities } = fieldData[currentField];

  // Reset dependent columns when field changes
  const handleFieldChange = useCallback((i: number) => {
    setFieldIndex(i);
    setCompIndex(0);
    setPrioIndex(0);
  }, []);

  const selectedComponent = components[compIndex] || components[0];
  const selectedPriority = priorities[prioIndex] || priorities[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update chat subtitle dynamically
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
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(var(--primary)), transparent)" }} />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-[0.03] pointer-events-none" style={{ background: "radial-gradient(circle, hsl(161 93% 30%), transparent)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display title-hero text-center mb-4">
          <span className="text-gradient-primary">Find your green material</span>
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-12 font-body max-w-lg mx-auto">
          Spin the drums, pick your combination, and let our AI find the best sustainable match.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 max-w-5xl mx-auto items-start">
          {/* 3D Slot columns */}
          <div
            className="grid grid-cols-3 gap-5 p-6 rounded-3xl"
            style={{
              background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
              perspective: "800px",
              transform: "rotateY(-2deg) rotateX(1deg)",
            }}
          >
            <SlotColumn label="Field" items={fields} activeIndex={fieldIndex} onChangeIndex={handleFieldChange} delay={0} />
            <SlotColumn label="Component" items={components} activeIndex={compIndex} onChangeIndex={setCompIndex} delay={120} />
            <SlotColumn label="Priority" items={priorities} activeIndex={prioIndex} onChangeIndex={setPrioIndex} delay={240} />
          </div>

          {/* Chat card */}
          <div
            className="bg-card rounded-2xl border border-border flex flex-col overflow-hidden animate-fade-in"
            style={{
              boxShadow: "0 12px 48px rgba(37,99,235,0.1), 0 2px 8px rgba(0,0,0,0.04)",
              animationDelay: "400ms",
              height: 420,
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

            {/* Selection preview + action */}
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
