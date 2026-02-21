import { useState, useRef, useCallback } from "react";
import { ChevronUp, ChevronDown, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    label: "Field",
    items: ["Medicine", "Formula 1", "Aerospace", "Orthopedics", "Cardiology", "Dentistry", "Neurosurgery", "Automotive", "Aviation"],
  },
  {
    label: "Component",
    items: ["Implant", "Suture", "Bone Plate", "Joint Prosthesis", "Stent", "Chassis Part", "Engine Mount", "Valve", "Casing"],
  },
  {
    label: "Priority",
    items: ["Minimum CO₂", "Maximum Strength", "Biodegradable", "Lightweight", "Recyclable", "Cost Efficient", "Biocompatible", "ISO Certified"],
  },
];

const ITEM_HEIGHT = 56;
const VISIBLE = 3;

function SlotColumn({ label, items }: { label: string; items: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(items.length - 1, index));
      setActiveIndex(clamped);
    },
    [items.length]
  );

  const visibleItems = () => {
    const result: { text: string; isCenter: boolean; key: string }[] = [];
    for (let offset = -1; offset <= 1; offset++) {
      const idx = activeIndex + offset;
      if (idx >= 0 && idx < items.length) {
        result.push({ text: items[idx], isCenter: offset === 0, key: `${idx}` });
      } else {
        result.push({ text: "", isCenter: false, key: `empty-${offset}` });
      }
    }
    return result;
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
        {label}
      </span>

      <button
        onClick={() => scrollTo(activeIndex - 1)}
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-30"
        disabled={activeIndex === 0}
        aria-label="Previous"
      >
        <ChevronUp className="w-5 h-5 text-primary" />
      </button>

      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl bg-[hsl(214,100%,97%)] w-full"
        style={{
          height: ITEM_HEIGHT * VISIBLE,
          perspective: "600px",
        }}
      >
        <div
          className="flex flex-col transition-transform duration-300 ease-out"
          style={{ transform: "rotateX(5deg)", transformOrigin: "center center" }}
        >
          {visibleItems().map((item) => (
            <div
              key={item.key}
              className={`flex items-center justify-center transition-all duration-300 ${
                item.isCenter
                  ? "scale-105 font-bold text-primary border-2 border-primary bg-card shadow-[0_0_16px_hsl(var(--primary)/0.25)] rounded-lg mx-1 z-10"
                  : "text-muted-foreground opacity-60"
              }`}
              style={{ height: ITEM_HEIGHT, minHeight: ITEM_HEIGHT }}
            >
              <span className="text-sm whitespace-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => scrollTo(activeIndex + 1)}
        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:bg-accent transition-colors disabled:opacity-30"
        disabled={activeIndex === items.length - 1}
        aria-label="Next"
      >
        <ChevronDown className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
}

export default function SlotMachineSelector() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-display title-hero text-center mb-14">
          <span className="text-gradient-primary">Find your green material</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 max-w-5xl mx-auto items-center">
          {/* Slot columns */}
          <div className="grid grid-cols-3 gap-4">
            {columns.map((col) => (
              <SlotColumn key={col.label} label={col.label} items={col.items} />
            ))}
          </div>

          {/* Chatbot card */}
          <div className="bg-card rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4 border border-border animate-fade-in">
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
              <Bot className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-display font-bold text-base">SurgGreen AI</h3>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">Ready to analyze your selection</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="mt-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-card-hover transition-all hover:scale-105"
            >
              Analyze this combination
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
