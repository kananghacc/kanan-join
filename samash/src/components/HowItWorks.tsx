import { motion } from "motion/react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Sign up with email",
      description: "Fill in your details so we can send your test access link. Takes 1-2 minutes."
    },
    {
      number: "02",
      title: "Take the full mock test online",
      description: "Complete the full IELTS-style test under realistic timing conditions (2h 45m)."
    },
    {
      number: "03",
      title: "Get your detailed report",
      description: "Receive your IELTS band score and detailed performance report instantly."
    }
  ];

  return (
    <section className="py-[96px] bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-[64px]"
        >
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.1] text-ink">
            How the free IELTS mock test works
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-[32px] relative">
          {/* Connecting line desktop */}
          <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-[2px] bg-hairline"></div>
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative block pl-[56px] md:pl-0 md:text-center"
            >
              {/* Connecting line mobile */}
              {index !== steps.length - 1 && (
                <div className="md:hidden absolute top-[48px] bottom-[-32px] left-[27px] w-[2px] bg-hairline"></div>
              )}
              
              <div className="absolute md:relative left-0 md:left-auto top-0 md:top-auto w-[56px] h-[56px] rounded-full bg-primary text-white flex items-center justify-center font-bold text-[18px] md:mx-auto md:mb-[24px] z-10 shadow-lg shadow-primary/20">
                {step.number}
              </div>
              <h3 className="text-[20px] font-bold text-ink mb-[8px] md:mt-[24px] tracking-tight">{step.title}</h3>
              <p className="text-[15px] text-body leading-[24px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
