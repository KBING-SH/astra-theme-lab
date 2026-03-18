import { cn } from "@/lib/utils";
import { useDraggableMarquee } from "@/hooks/use-draggable-marquee";

const testimonials = [
  {
    name: "Emily Tran",
    role: "Graphic Designer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    content: "Using AI pixel conversion to turn images into pixel art has been enjoyable. The tool captures the essence of my photos, creating pixel portraits that work well for digital projects. It's interesting to see how the pixelated style keeps key details while giving images a nostalgic feel. I also appreciate the straightforward conversion process.",
  },
  {
    name: "Carlos Mendez",
    role: "Social Media Enthusiast",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "I like how AI pixel conversion transforms my profile pictures into unique pixel art avatars. It adds a retro touch that stands out on social platforms. Uploading a photo and seeing it turned into pixel art with clear features is fun. This pixel style gives my online presence a fresh, creative look with little effort.",
  },
  {
    name: "Aisha Khan",
    role: "Indie Game Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "The AI pixel conversion tool is useful for creating pixel art characters from reference images. It simplifies detailed photos into pixelated versions that keep important visual elements. This helps me visualize game sprites in a retro style. The pixel art output is clear enough to keep character identity recognizable.",
  },
  {
    name: "Michael O'Neill",
    role: "Digital Artist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "I've found AI pixel conversion helpful for turning my artwork into pixel art. The conversion respects the original style while simplifying it into pixel form. It's satisfying to see how the pixel art preserves key aspects like color and shape, making it suitable for digital collections with a retro look.",
  },
  {
    name: "Hana Suzuki",
    role: "Content Creator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    content: "Creating pixel art avatars with AI pixel conversion has been a creative boost. The tool turns photos into pixelated images that keep recognizable features intact. It's a good way to add a distinctive retro touch to my channel art and social profiles, making my content visually appealing.",
  },
  {
    name: "Liam Johnson",
    role: "Hobbyist Photographer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    content: "I tried AI pixel conversion to see how my photos would look in pixel art style. The results were charming and captured the main details well. It was interesting to watch the change from a high-res photo to a pixelated version that still reflects the original image's character.",
  },
  {
    name: "Sofia Petrova",
    role: "Animator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    content: "The pixel conversion tool helped me create pixel art avatars that keep the essence of my characters. It balances simplification with style preservation nicely. This makes it easier to experiment with pixel art in my animations while keeping important design elements visible.",
  },
  {
    name: "Rajesh Patel",
    role: "Web Designer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    content: "AI pixel conversion gave me a fresh way to create unique pixel art for website avatars. The pixelated portraits keep the original photo's personality, adding a nostalgic charm to my design projects. The process was straightforward, and the pixel art looks good for digital use.",
  },
  {
    name: "Isabella Rossi",
    role: "Student",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    content: "I enjoyed turning my photos into pixel art using AI pixel conversion. The pixelated style feels retro and fun, and the tool keeps the main features clear. It's a neat way to make cartoon-like avatars that stand out on social media or in online communities.",
  },
  {
    name: "Daniel Kim",
    role: "Casual Gamer",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    content: "Using AI pixel conversion to make pixel art avatars was a cool experience. The pixel art style fits well with my interest in retro games, and the tool preserves recognizable details of the original images. It's a fun way to create game-like avatars for forums or profiles.",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5, 10);

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: typeof testimonials;
  reverse?: boolean;
}) {
  const { scrollRef, handlers } = useDraggableMarquee();

  return (
    <div
      className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] cursor-grab active:cursor-grabbing select-none touch-none scrollbar-hide"
      {...handlers}
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-3 md:gap-5 w-max",
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        )}
        style={{ willChange: "transform" }}
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <li
            key={i}
            className="w-[260px] md:w-[380px] shrink-0 rounded-xl md:rounded-2xl border border-border/50 bg-card p-3 md:p-5 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
          >
            <figure>
              <blockquote className="text-xs md:text-sm text-body2 leading-relaxed md:leading-[1.75] mb-2 md:mb-4 line-clamp-3">
                "{t.content}"
              </blockquote>
              <figcaption className="flex items-center gap-2 md:gap-3">
                <img
                  src={t.avatar}
                  alt={`${t.name}, ${t.role}`}
                  className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
                  loading="lazy"
                  width="36"
                  height="36"
                  draggable={false}
                />
                <div>
                  <p className="text-xs md:text-sm font-semibold text-title leading-snug">
                    {t.name}
                  </p>
                  <p className="text-[10px] md:text-xs text-body-desc">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className="py-10 md:py-24 overflow-hidden"
      aria-labelledby="user-feedback-title"
    >
      <div className="container px-4 md:px-8 max-w-6xl mb-6 md:mb-12">
        <h2 id="user-feedback-title" className="text-xl md:text-3xl font-bold text-title text-center mb-2 md:mb-3">
          What Users Say
        </h2>
        <p className="text-sm md:text-base text-body-desc text-center max-w-lg mx-auto">
          Sample feedback from users who tried Rita for pixel art creation.
        </p>
      </div>

      <div className="space-y-3 md:space-y-5">
        <MarqueeRow items={row1} />
        <MarqueeRow items={row2} reverse />
      </div>
    </section>
  );
}
