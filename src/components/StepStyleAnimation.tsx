import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const PROMPT_TEXT = "Transform into retro pixel art style, 8-bit aesthetic";

const BTN_POS: [number, number] = [50, 88];

type Step =
  | { type: "idle" }
  | { type: "focusPrompt" }
  | { type: "typing" }
  | { type: "pause" }
  | { type: "moveBtn" }
  | { type: "clickBtn" }
  | { type: "loading" }
  | { type: "reset" };

const SCRIPT: { step: Step; duration: number }[] = [
  { step: { type: "idle" }, duration: 600 },
  { step: { type: "focusPrompt" }, duration: 400 },
  { step: { type: "typing" }, duration: 4000 },
  { step: { type: "pause" }, duration: 1200 },
  { step: { type: "moveBtn" }, duration: 600 },
  { step: { type: "clickBtn" }, duration: 300 },
  { step: { type: "loading" }, duration: 2000 },
  { step: { type: "reset" }, duration: 600 },
];

export function StepStyleAnimation({ active = true }: { active?: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [cursorPos, setCursorPos] = useState<[number, number]>([50, 10]);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [promptFocused, setPromptFocused] = useState(false);
  const [btnPressed, setBtnPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const typingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const entry = SCRIPT[stepIndex];
    const { step } = entry;

    switch (step.type) {
      case "idle":
        setCursorVisible(true);
        setCursorPos([50, 10]);
        setTypedChars(0);
        setPromptFocused(false);
        setBtnPressed(false);
        setIsLoading(false);
        break;
      case "focusPrompt":
        setCursorPos([30, 45]);
        setPromptFocused(true);
        break;
      case "typing":
        setCursorVisible(false);
        // Type characters one by one
        if (typingRef.current) clearInterval(typingRef.current);
        {
          let charIdx = 0;
          const interval = entry.duration / PROMPT_TEXT.length;
          typingRef.current = setInterval(() => {
            charIdx++;
            setTypedChars(charIdx);
            if (charIdx >= PROMPT_TEXT.length) {
              if (typingRef.current) clearInterval(typingRef.current);
            }
          }, interval);
        }
        break;
      case "pause":
        break;
      case "moveBtn":
        setCursorVisible(true);
        setCursorPos(BTN_POS);
        break;
      case "clickBtn":
        setBtnPressed(true);
        break;
      case "loading":
        setBtnPressed(false);
        setIsLoading(true);
        setCursorVisible(false);
        break;
      case "reset":
        setIsLoading(false);
        setPromptFocused(false);
        setTypedChars(0);
        break;
    }

    if (!active) return;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % SCRIPT.length);
    }, entry.duration);

    return () => {
      clearTimeout(timer);
      if (typingRef.current) clearInterval(typingRef.current);
    };
  }, [stepIndex, active]);

  const displayedText = PROMPT_TEXT.slice(0, typedChars);

  return (
    <div className="w-full h-full bg-card relative overflow-hidden flex flex-col p-[5%] gap-[4%]">
      {/* Prompt label */}
      <p className="text-[0.55em] text-body-desc font-medium leading-none">
        Prompt <span className="text-destructive">*</span>
      </p>

      {/* Prompt textarea mock */}
      <div
        className="flex-1 min-h-0 rounded-[0.3em] border px-[4%] py-[3%] relative transition-colors duration-200"
        style={{
          borderColor: promptFocused ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border) / 0.5)",
          backgroundColor: "hsl(var(--card))",
          boxShadow: promptFocused ? "0 0 0 1px hsl(var(--primary) / 0.3)" : "none",
        }}
      >
        {typedChars === 0 && !promptFocused && (
          <span className="text-[0.4em] text-body-desc/50 leading-relaxed">
            Describe how you want to process the image...
          </span>
        )}
        <span className="text-[0.4em] text-title leading-relaxed break-words">
          {displayedText}
          {promptFocused && (
            <motion.span
              className="inline-block w-[1px] h-[1em] bg-title ml-[1px] align-text-bottom"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
          )}
        </span>
      </div>

      {/* Generate button */}
      <motion.div
        className="w-full h-[13%] rounded-lg flex items-center justify-center shrink-0 relative"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--theme1)))",
        }}
        animate={{ scale: btnPressed ? 0.95 : 1 }}
        transition={{ duration: 0.1 }}
      >
        {!isLoading && (
          <span className="text-[0.5em] font-semibold text-white">Generate ⚡10</span>
        )}
        {isLoading && (
          <div className="flex items-center gap-[3px]">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-[4px] h-[4px] rounded-full bg-white/80"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Cursor */}
      <motion.div
        className="absolute w-4 h-4 z-10 pointer-events-none"
        animate={{
          left: `${cursorPos[0]}%`,
          top: `${cursorPos[1]}%`,
          opacity: cursorVisible ? 0.9 : 0,
        }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 drop-shadow">
          <path d="M5 3l14 8-6 2-4 6-4-16z" fill="hsl(var(--title))" stroke="hsl(var(--card))" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}
