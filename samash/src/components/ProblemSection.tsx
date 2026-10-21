import { motion } from "motion/react";
import { Clock, Headphones } from "lucide-react";

export default function ProblemSection() {
  return (
    <section className="py-[96px] bg-brand-blue-pale overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-primary text-[12px] font-bold tracking-[0.1em] uppercase mb-6">
              THE READINESS CHECK
            </div>
            <h2 className="text-[40px] md:text-[56px] font-extrabold tracking-tight mb-8 leading-[1.1] text-ink">
              Most students don't realise their weak areas until the actual exam.
            </h2>
            <div className="text-[18px] text-body leading-[1.6]">
              Watching IELTS videos is one thing. Performing under real exam pressure is another. This mock test helps you experience real timing pressure, section switching, listening focus, writing speed, and score consistency before your actual IELTS attempt.
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full relative"
          >
            <div className="w-full rounded-[24px] border border-hairline bg-canvas p-6 lg:p-10 shadow-2xl shadow-brand-blue/10 relative overflow-hidden">
              {/* Red glow behind */}
              <div className="absolute -bottom-[50%] -right-[20%] w-[300px] h-[300px] bg-primary/20 blur-[100px] pointer-events-none rounded-full"></div>
              
              <div className="space-y-4 mb-8">
                {/* Clock Row */}
                <div className="flex items-center gap-4 bg-brand-blue-soft rounded-[12px] p-5 border border-hairline shadow-inner shadow-brand-blue/5">
                  <Clock className="w-6 h-6 text-primary" />
                  <span className="text-body-strong text-[16px] font-medium">01:00:00 exam clock</span>
                </div>
                {/* Listen Row */}
                <div className="flex items-center gap-4 bg-brand-blue-soft rounded-[12px] p-5 border border-hairline shadow-inner shadow-brand-blue/5">
                  <Headphones className="w-6 h-6 text-primary" />
                  <span className="text-body-strong text-[16px] font-medium">Listening focus window</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-brand-blue-soft rounded-full mb-8 overflow-hidden">
                <div className="w-[60%] h-full bg-gradient-to-r from-primary/80 to-primary rounded-full shadow-[0_0_10px_rgba(255,58,58,0.5)]"></div>
              </div>

              {/* Bottom White Card */}
              <div className="bg-canvas-warm rounded-[16px] p-6 shadow-xl shadow-primary/10 relative z-10 w-[95%] border border-primary/10">
                <h3 className="text-ink text-[20px] font-bold tracking-tight">Band clarity after completion</h3>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
