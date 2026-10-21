import { motion } from "motion/react";
import { BriefcaseBusiness, GraduationCap, Plane, Stamp } from "lucide-react";

export default function IELTSImportance() {
  const reasons = [
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      title: "University Admissions",
      description: "A strong IELTS band score helps prove you can study, write, discuss, and perform in an English-speaking academic environment.",
    },
    {
      icon: <Stamp className="h-6 w-6 text-primary" />,
      title: "Visa Confidence",
      description: "Your band score can directly influence study visa readiness, documentation strength, and how confidently you move through applications.",
    },
    {
      icon: <BriefcaseBusiness className="h-6 w-6 text-primary" />,
      title: "Career Pathways",
      description: "Employers and licensing bodies often use IELTS as a trusted signal of workplace communication and professional English ability.",
    },
    {
      icon: <Plane className="h-6 w-6 text-primary" />,
      title: "Global Mobility",
      description: "IELTS keeps your options open across study abroad, migration, and international opportunities in multiple countries.",
    },
  ];

  return (
    <section className="bg-canvas py-[96px]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-[112px]"
          >
            <div className="mb-6 text-[12px] font-bold uppercase tracking-[0.1em] text-primary">
              WHY IELTS MATTERS
            </div>
            <h2 className="mb-6 text-[40px] font-extrabold leading-[1.08] tracking-tight text-ink md:text-[56px]">
              IELTS is more than a test score.
            </h2>
            <p className="text-[18px] leading-[1.6] text-body">
              It is often the proof point that connects your preparation to admissions, visas, jobs, and life abroad. Knowing your current band early helps you plan with less guesswork.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[18px] border border-hairline bg-brand-blue-pale p-6 shadow-sm shadow-brand-blue/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {reason.icon}
                </div>
                <h3 className="mb-3 text-[20px] font-bold tracking-tight text-ink">
                  {reason.title}
                </h3>
                <p className="text-[15px] leading-[24px] text-body">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
