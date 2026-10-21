import { motion } from "motion/react";
import { Star, TrendingUp } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Rahul M.",
      targetScore: "Target: 7.0",
      result: "Got 7.5 Band - Exactly as predicted!",
      review: "The mock test accurately predicted my score and helped me understand where I was losing marks. Highly recommend this for true IELTS prep."
    },
    {
      name: "Ananya S.",
      targetScore: "Target: 6.5",
      result: "Got 7.0 Band",
      review: "Loved the detailed section-wise breakdown. The timed simulation gave me the confidence I needed for the real exam."
    },
    {
      name: "Vikram P.",
      targetScore: "Target: 8.0",
      result: "Got 8.0 Band - Met my goal",
      review: "The AI analysis is spot on. It really nailed my weak areas and gave constructive feedback. A complete lifesaver!"
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
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-[14px] mb-6 shadow-sm border border-primary/20">
            <TrendingUp className="w-4 h-4" />
            50,000+ students worldwide
          </div>
          <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.1] text-ink mb-[24px]">
            Trusted by IELTS learners worldwide.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-[24px] text-body font-medium pb-4">
             <div className="flex flex-col items-center">
               <span className="text-[32px] tracking-tight font-extrabold text-ink leading-none mb-1">95%</span> 
               <span className="text-[14px]">Avg. prediction accuracy</span>
             </div>
             <div className="hidden sm:block w-[1px] h-[40px] bg-hairline"></div>
             <div className="flex flex-col items-center">
               <span className="text-[32px] tracking-tight font-extrabold text-ink leading-none mb-1">2h 45m</span>
               <span className="text-[14px]">Avg. attempt time</span>
             </div>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-[24px]">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-canvas p-[32px] rounded-[16px] border border-hairline shadow-sm shadow-brand-blue/5 relative hover:shadow-md hover:shadow-brand-blue/10 transition-shadow flex flex-col h-full"
            >
              <div className="flex gap-1 mb-[16px]">
                {[1,2,3,4,5].map(star => (
                   <Star key={star} className="w-[16px] h-[16px] fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              <h3 className="font-bold text-ink text-[18px] mb-[12px]">{testimonial.result}</h3>
              <p className="text-[15px] text-body-strong mb-[24px] leading-[24px] italic flex-grow">
                "{testimonial.review}"
              </p>
              <div className="flex items-center justify-between border-t border-hairline pt-[20px] mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-[40px] h-[40px] rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[16px]">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[15px] font-bold text-ink leading-none mb-1">
                      {testimonial.name}
                    </div>
                    <div className="text-[12px] font-medium text-mute">
                      {testimonial.targetScore}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
