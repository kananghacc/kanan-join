import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down a bit, hide near primary CTA sections.
      const scrolled = window.scrollY > 500;
      const leadFormElement = document.getElementById('lead-form');
      const finalCTAElement = document.getElementById('final-cta');
      const isElementInView = (element: HTMLElement | null) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };

      const primaryCTAInView = isElementInView(leadFormElement) || isElementInView(finalCTAElement);
      setIsVisible(scrolled && !primaryCTAInView);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[16px] inset-x-[16px] z-50 mx-auto max-w-[720px] rounded-[24px] border border-hairline bg-canvas/95 p-[16px] shadow-[0_8px_30px_rgba(11,58,102,0.16)] backdrop-blur-md sm:flex sm:items-center sm:justify-between sm:gap-5 sm:px-5"
          >
            <div className="mb-[12px] text-center sm:mb-0 sm:text-left">
              <div className="text-[12px] font-bold text-body uppercase tracking-wide">
                Timed mock test &bull; Instant score
              </div>
            </div>
            <a
              href="#lead-form"
              className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-[14px] text-[16px] font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98] sm:w-auto sm:whitespace-nowrap"
            >
              Get Free Mock Test
            </a>
          </motion.div>
      )}
    </AnimatePresence>
  );
}
