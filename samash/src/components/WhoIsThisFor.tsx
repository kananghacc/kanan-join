import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

export default function WhoIsThisFor() {
  const points = [
    "Need a target band for study abroad",
    "Want to know if they are actually ready for the IELTS",
    "Feel stuck at the same score range",
    "Are preparing for an upcoming exam date",
    "Want realistic performance feedback",
    "Prefer structured preparation over guesswork"
  ];

  return (
    <section className="py-[96px] bg-canvas relative overflow-hidden text-ink">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-brand-blue-soft via-canvas to-canvas-warm shadow-2xl shadow-brand-blue/10 border border-hairline rounded-[32px] p-8 md:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-md"
            >
              <div className="text-primary text-[12px] font-bold tracking-[0.1em] uppercase mb-6">
                QUALIFICATION FILTER
              </div>
              <h2 className="text-[44px] md:text-[56px] font-extrabold tracking-tight leading-[1.1] text-ink">
                This mock test is for serious IELTS aspirants who:
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              {points.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 border border-hairline bg-canvas/82 backdrop-blur-sm rounded-[12px] p-5 shadow-sm shadow-brand-blue/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-body-strong text-[15px] font-medium">{point}</span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
