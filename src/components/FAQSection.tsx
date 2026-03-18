import { useState } from "react";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is AI pixel conversion used for?",
    a: "AI pixel conversion is used to transform photos or images into pixel art, creating pixelated portraits that capture the essence of the original picture.",
  },
  {
    q: "How does AI pixel conversion transform an image?",
    a: "It converts an uploaded photo into a pixelated cartoon avatar by simplifying the image into pixel art with a retro feel, preserving key features in a pixelated format.",
  },
  {
    q: "Can AI pixel conversion create pixel art avatars from any photo?",
    a: "Yes, by uploading an image, the tool transforms it into a pixel art avatar suitable for uses like game characters or social profiles.",
  },
  {
    q: "What style results from using AI pixel conversion?",
    a: "The result is a pixelated cartoon portrait that reflects a retro pixel art style, turning the original photo into a simplified pixel art image.",
  },
  {
    q: "Is the process of converting images to pixel art complicated?",
    a: "The process involves uploading an image and receiving a pixel art version, making converting an image to pixel art simple and straightforward.",
  },
  {
    q: "What types of images work best with AI pixel conversion?",
    a: "Clear photos that capture the essence of the subject work best, as the tool creates pixel art that maintains recognizable features from the original image.",
  },
  {
    q: "What can AI pixel conversion be used for?",
    a: "It can be used to create pixel art avatars for social media, game characters, or artistic projects requiring a retro pixel style.",
  },
  {
    q: "Does AI pixel conversion change the colors of the original image?",
    a: "The tool transforms the image into pixel art with a cartoon style, typically applying a pixelated retro effect, though specific color preservation details are not specified.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-10 md:py-24" itemScope itemType="https://schema.org/FAQPage">
      <div className="container px-4 md:px-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-10">
          <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <MessageCircleQuestion className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-title">FAQ</h2>
        </div>

        {/* FAQ list */}
        <div className="rounded-2xl border border-border/50 bg-card shadow-soft overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const isLast = i === faqs.length - 1;
            return (
              <div
                key={i}
                className={cn(!isLast && "border-b border-border/40")}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={cn(
                    "w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer group transition-colors duration-200",
                    isOpen ? "bg-primary/[0.04]" : "hover:bg-hover-bg"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "text-xs font-bold tabular-nums w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                        isOpen
                          ? "gradient-primary text-white shadow-sm"
                          : "bg-muted text-body-desc"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      itemProp="name"
                      className={cn(
                        "text-[15px] font-medium transition-colors",
                        isOpen ? "text-title" : "text-title group-hover:text-primary"
                      )}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isOpen
                        ? "rotate-180 text-primary"
                        : "text-body-desc group-hover:text-primary"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="overflow-hidden">
                    <p itemProp="text" className="px-6 pb-5 pl-[3.75rem] text-sm text-body-desc leading-[1.8]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
