import { Zap, Paintbrush, Download, Wand2, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Quick & Easy",
    desc: "Upload any photo and get pixel art in seconds — no design skills or complicated setup required.",
    accent: "from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(45,100%,60%)] to-[hsl(30,95%,55%)]",
    stat: "3",
    statLabel: "Steps",
  },
  {
    icon: Wand2,
    title: "AI-Powered Precision",
    desc: "Multiple AI models work together to deliver detailed, expressive pixel art that captures your image's essence.",
    accent: "from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    iconBg: "bg-gradient-to-br from-[hsl(240,74%,61%)] to-[hsl(280,65%,60%)]",
    stat: "7+",
    statLabel: "AI Models",
  },
  {
    icon: Download,
    title: "HD Downloads",
    desc: "Export crisp, watermark-free pixel art ready for game assets, avatars, prints, and creative projects.",
    accent: "from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    iconBg: "bg-gradient-to-br from-[hsl(162,63%,50%)] to-[hsl(180,60%,45%)]",
    stat: "HD",
    statLabel: "Quality",
  },
  {
    icon: Sparkles,
    title: "Versatile Styles",
    desc: "From retro 8-bit to modern pixel aesthetics — choose the pixel art look that fits your creative vision.",
    accent: "from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(340,75%,55%)] to-[hsl(300,60%,55%)]",
    stat: "8+",
    statLabel: "Styles",
  },
  {
    icon: Paintbrush,
    title: "Prompt Control",
    desc: "Fine-tune your pixel art with custom prompts — control colors, mood, and detail level for personalized results.",
    accent: "from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    iconBg: "bg-gradient-to-br from-[hsl(200,80%,55%)] to-[hsl(220,75%,55%)]",
    stat: "∞",
    statLabel: "Possibilities",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "Your uploads are processed securely and handled with care. We respect your data and protect your privacy.",
    accent: "from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    iconBg: "bg-gradient-to-br from-[hsl(150,55%,45%)] to-[hsl(162,63%,50%)]",
    stat: "✓",
    statLabel: "Secure",
  },
];

export function WhyChoose() {
  return (
    <section className="py-12 md:py-28 bg-card-alt">
      <div className="container px-4 md:px-8 max-w-6xl">
        <h2 className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          Features & Benefits
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center mb-10 md:mb-16 max-w-xl mx-auto">
          Everything you need to create stunning pixel art from any photo
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-card border border-border/40 p-4 md:p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Stat badge */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl ${f.iconBg} flex items-center justify-center shadow-md shrink-0`}>
                    <f.icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-title">{f.title}</h3>
                </div>
                <div className="text-right shrink-0">
                  <div className={`text-xl font-bold bg-gradient-to-r ${f.accent} bg-clip-text text-transparent`}>
                    {f.stat}
                  </div>
                  <div className="text-[11px] text-body-desc">{f.statLabel}</div>
                </div>
              </div>

              <p className="text-sm text-body-desc leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
