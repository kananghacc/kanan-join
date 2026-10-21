import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

export default function FAQs() {
  const faqs = [
    {
      question: "Is this test identical to the real IELTS?",
      answer: "Our mock mirrors the official IELTS format, band prediction accuracy, and timing. Use it to assess readiness before registering for the official test."
    },
    {
      question: "How long does the mock test take?",
      answer: "Full test: 2 hours 45 minutes. Can be paused and resumed within 24 hours."
    },
    {
      question: "When will I get my results?",
      answer: "Instant band score and performance report within 5 minutes of submission."
    },
    {
      question: "Is it really free?",
      answer: "Yes. Completely free. No credit card required."
    },
    {
      question: "What happens after I take the test?",
      answer: "You'll receive personalized study recommendations and can opt into Kanan.co's structured IELTS preparation program."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-[96px] bg-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-[64px]"
        >
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.1] text-ink">
            Questions before you take the test?
          </h2>
        </motion.div>
        
        <div className="space-y-[16px]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={index} 
                className="border border-hairline rounded-[12px] bg-canvas overflow-hidden shadow-sm shadow-brand-blue/5"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-[24px] text-left focus:outline-none"
                >
                  <span className="text-[16px] font-bold text-ink pr-[32px]">{faq.question}</span>
                  <div className={`w-[32px] h-[32px] shrink-0 rounded-full border flex items-center justify-center transition-colors ${isOpen ? 'bg-primary border-primary text-white' : 'bg-brand-blue-soft border-hairline text-mute'}`}>
                    {isOpen ? <Minus className="w-[16px] h-[16px]" /> : <Plus className="w-[16px] h-[16px]" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-[24px] pb-[24px] text-body text-[15px] leading-[24px] border-t border-hairline pt-[16px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
