import { useState, useEffect } from "react";
import { User, PawPrint, Mountain, ChevronRight } from "lucide-react";
import landscapeBefore from "@/assets/landscape-before.jpg";
import landscapeAfter from "@/assets/landscape-after.jpg";
import petBefore from "@/assets/pet-before.jpg";
import petAfter from "@/assets/pet-after.jpg";
import portraitBefore from "@/assets/portrait-before.jpg";
import portraitAfter from "@/assets/portrait-after.jpg";
import { AutoComparisonSlider } from "@/components/AutoComparisonSlider";

const SECTION_PROMPTS = [
  "Transform the photo into retro pixel art style, using a limited color palette and crisp pixel blocks, creating an 8-bit game-like nostalgic aesthetic suitable for avatars and social profiles.",
  "Convert this pet photo into charming pixel art, using colorful pixel blocks to capture the pet's personality in a retro game sprite style.",
  "Turn this landscape into pixel art scenery, simplifying the scene into crisp pixel blocks with a retro color palette, creating a nostalgic 8-bit world.",
];

const sections = [
  {
    icon: User,
    title: "Pixel Art Conversion with AI Pixel Conversion",
    subtitle: "Transform your photos into pixel art",
    image: null,
    comparison: { before: portraitBefore, after: portraitAfter },
    imageAlt: "Photo transformed into pixel art using AI pixel conversion",
    paragraphs: [
      "Create a cartoon avatar with AI pixel conversion by uploading any image. This tool transforms photos into pixel art with a charming style, suitable for game characters or social profiles. Simply upload your picture to see it in a pixelated form. Enjoy converting your images into pixel art with AI pixel conversion.",
    ],
    imageFirst: true,
  },
  {
    icon: PawPrint,
    title: "Convert to Pixel Art Using AI Pixel Conversion",
    subtitle: "Create pixel art portraits from your photos",
    image: null,
    comparison: { before: petBefore, after: petAfter },
    imageAlt: "Pet photo turned into pixel art with AI pixel conversion",
    paragraphs: [
      "Turn your photos into pixelated cartoon-style images with AI pixel conversion. Upload your image to create a pixel art portrait that captures the essence of your original picture.",
      "This tool makes converting an image to pixel art simple and straightforward through AI pixel conversion. Receive your pixel art avatar quickly and easily.",
    ],
    imageFirst: false,
  },
  {
    icon: Mountain,
    title: "Pixel Art Conversion by AI Pixel Conversion",
    subtitle: "Create retro pixel art from any image",
    image: null,
    comparison: { before: landscapeBefore, after: landscapeAfter },
    imageAlt: "Landscape photo converted into pixel art using AI pixel conversion",
    paragraphs: [
      "Create a cartoon-style avatar by using AI pixel conversion to turn your photos into pixel art. Upload your image to see it transformed into a pixel portrait with a retro feel.",
      "This easy process lets you convert images to pixel art using AI pixel conversion. Try it and explore your unique pixel creation.",
    ],
    imageFirst: true,
  },
];

export function ContentSections({ onSelectStyle }: { onSelectStyle?: (styleIndex: number) => void }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTryNow = (sectionIndex: number) => {
    if (onSelectStyle) {
      onSelectStyle(SECTION_STYLE_MAP[sectionIndex] ?? 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const checkScrollDone = () => {
        if (window.scrollY <= 5) {
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 3000);
        } else {
          requestAnimationFrame(checkScrollDone);
        }
      };
      requestAnimationFrame(checkScrollDone);
    }
  };

  return (
    <>
      {showTooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ top: 0, left: 0, width: '100%', height: '100%' }}>
          <UploadTooltip />
        </div>
      )}
      <section className="space-y-0">
        <div className="max-w-[1600px] mx-auto space-y-0">
          {sections.map((section, i) => (
            <div
              key={i}
              className={`py-10 md:py-16 lg:py-24 ${i % 2 === 0 ? "bg-muted/40" : "bg-background"}`}
            >
              <article
                className={`px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-5 lg:gap-[80px] ${
                  section.imageFirst ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="w-full lg:w-[55%] shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50">
                    {section.comparison ? (
                      <AutoComparisonSlider
                        beforeSrc={section.comparison.before}
                        afterSrc={section.comparison.after}
                        beforeAlt="Original photo"
                        afterAlt="Cartoon effect"
                      />
                    ) : (
                      <img
                        src={section.image!}
                        alt={section.imageAlt}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                <div className="w-full lg:w-[45%] space-y-5">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold tracking-wide">
                      <section.icon className="h-3.5 w-3.5" />
                      <span>{section.subtitle}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-title leading-tight tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-base md:text-lg text-body2 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => handleTryNow(i)}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-primary text-primary-foreground text-base font-semibold transition-all hover:opacity-90 hover:shadow-lg group"
                    >
                      <span>Try it now</span>
                      <ChevronRight className="h-4 w-4 text-primary-foreground/70 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function UploadTooltip() {
  const [pos, setPos] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  useEffect(() => {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>("#upload-drop-zone"));
    const el = candidates.find((node) => {
      const rect = node.getBoundingClientRect();
      const style = window.getComputedStyle(node);
      return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
    });

    if (el) {
      const rect = el.getBoundingClientRect();
      setPos({ top: rect.top, left: rect.left, width: rect.width, height: rect.height });
    }
  }, []);

  if (!pos) return null;

  return (
    <div
      className="absolute animate-fade-in flex items-center justify-center"
      style={{ top: pos.top, left: pos.left, width: pos.width, height: pos.height }}
    >
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-[bounce_1s_ease-in-out_3]">
        👆 Upload your image here to get started
      </div>
    </div>
  );
}
