import { motion } from "motion/react";
import { Star } from "lucide-react";

export default function FinalCTA() {
  const assetBase = import.meta.env.BASE_URL;

  return (
    <section id="final-cta" className="py-[100px] bg-primary relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 opacity-10 blur-3xl">
        <div className="w-[300px] h-[300px] bg-white rounded-full"></div>
      </div>
      <div className="absolute bottom-0 left-0 opacity-10 blur-3xl">
        <div className="w-[400px] h-[400px] bg-white rounded-full"></div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
        >
          
          <h2 className="text-[36px] md:text-[56px] font-extrabold tracking-tight mb-[24px] leading-[1.1] text-white">
            You’ve prepared long enough.<br />
            Now see where you actually stand.
          </h2>
          
          <p className="text-[18px] md:text-[20px] text-white/90 mb-[48px] max-w-2xl mx-auto leading-[1.6]">
            Register for the free IELTS mock test, check your inbox for the access link, complete the timed test, and get your score instantly.
          </p>
          
          <div className="flex flex-col items-center">
            <a
              href="#lead-form"
              className="inline-flex w-full sm:w-auto items-center justify-center bg-white text-primary text-[18px] font-extrabold px-[40px] py-[18px] rounded-full transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-blue/15"
            >
              Get Free Mock Test
            </a>
            
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src={`${assetBase}students/jay_parekh_pte_review_3159de62ff.png`} alt="Student"/>
                <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src={`${assetBase}students/richa_38b4ed24c2.png`} alt="Student"/>
                <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src={`${assetBase}students/tulsi_thakar_66cb3365ee.png`} alt="Student"/>
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-white text-primary flex items-center justify-center text-[10px] font-bold">14k+</div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex text-white">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[13px] font-medium text-white/90 mt-0.5 tracking-wide">Tested by 14k+ students</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
