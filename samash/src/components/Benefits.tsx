import { motion } from "motion/react";
import { CopyCheck, Timer, Zap, BarChart3, Mail, ShieldAlert } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      title: "Accurate Band Score Prediction",
      description: "Our AI analyzes your responses for precise IELTS band estimation."
    },
    {
      icon: <CopyCheck className="w-6 h-6 text-primary" />,
      title: "Complete Mock Test Simulation",
      description: "Full 2h 45m exam experience with reading, writing, listening, speaking."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Detailed Performance Report",
      description: "Know your strengths & weak areas with section-wise breakdown."
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Expert Feedback",
      description: "Access detailed answer explanations after submission."
    }
  ];

  return (
    <section className="py-[96px] bg-brand-blue-pale">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-[64px]"
        >
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.1] text-ink">
            A complete IELTS readiness check.
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-[24px]">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-canvas border border-hairline shadow-sm shadow-brand-blue/5 p-[32px] rounded-[16px] hover:shadow-md hover:shadow-brand-blue/10 transition-shadow"
            >
              <div className="w-[48px] h-[48px] bg-primary/10 rounded-full flex items-center justify-center mb-[24px]">
                {benefit.icon}
              </div>
              <h3 className="text-[20px] font-bold tracking-tight text-ink mb-[12px]">{benefit.title}</h3>
              <p className="text-[15px] text-body leading-[24px]">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
