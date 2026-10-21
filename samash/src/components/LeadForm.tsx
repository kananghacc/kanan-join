import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Mail, Lock } from "lucide-react";

export default function LeadForm({ onSubmit }: { onSubmit: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    targetBand: "",
    country: "",
    purpose: "",
    consent: false
  });

  const handleSubmitStep1 = (e: FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onSubmit();
    }, 600);
  };

  const bands = ["5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0"];
  const purposes = ["University Admission", "Work/Migration", "Study Visa", "Other"];

  return (
    <section className="py-[96px] bg-brand-blue-pale border-y border-hairline relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-5 gap-[48px]">
          
          <div className="md:col-span-2 flex flex-col justify-center">
            <h2 className="text-[36px] md:text-[48px] font-extrabold tracking-tight leading-[1.1] text-ink mb-6">
              Get your free IELTS mock test access link
            </h2>
            <p className="text-[18px] text-body leading-[28px] mb-[32px]">
              Enter your details below and we'll send the test link to your email. Complete the timed mock test and receive your score instantly after submission.
            </p>
            
            <div className="space-y-[16px]">
              <div className="flex items-center gap-[12px] text-[16px] text-body-strong font-medium">
                <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-[16px] h-[16px] text-primary" />
                </div>
                Detailed section-wise analysis
              </div>
              <div className="flex items-center gap-[12px] text-[16px] text-body-strong font-medium">
                <div className="w-[32px] h-[32px] rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-[16px] h-[16px] text-primary" />
                </div>
                Realistic exam interface
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-canvas p-[32px] md:p-[48px] rounded-[24px] border border-hairline shadow-xl shadow-brand-blue/10">
              
              {/* Form Steps Indicator */}
              <div className="flex gap-[8px] mb-[32px]">
                <div className={`h-[6px] flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-brand-blue-soft'} transition-all duration-300`}></div>
                <div className={`h-[6px] flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-brand-blue-soft'} transition-all duration-300`}></div>
              </div>
              
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmitStep1}
                    className="space-y-[20px]"
                  >
                    <div>
                      <label className="block text-[14px] font-bold text-body-strong mb-[8px]">First Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-brand-blue-pale border border-hairline rounded-[12px] px-[16px] py-[12px] text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[15px]"
                        placeholder="e.g. Rahul"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold text-body-strong mb-[8px]">Email Address</label>
                      <input 
                        required 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-brand-blue-pale border border-hairline rounded-[12px] px-[16px] py-[12px] text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[15px]"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold text-body-strong mb-[8px]">Phone Number</label>
                      <input 
                        required 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-brand-blue-pale border border-hairline rounded-[12px] px-[16px] py-[12px] text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[15px]"
                        placeholder="+91"
                      />
                    </div>
                    <button type="submit" className="w-full bg-brand-blue hover:bg-body-strong text-white font-bold py-[14px] rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] mt-[12px] text-[16px]">
                      Continue to Next Step
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-[20px] text-[13px] text-mute font-medium">
                      <Lock className="w-[14px] h-[14px]" />
                      We respect your privacy
                    </div>
                  </motion.form>
                )}
                
                {step === 2 && (
                  <motion.form
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleFinalSubmit}
                    className="space-y-[20px]"
                  >
                     <div>
                      <label className="block text-[14px] font-bold text-body-strong mb-[8px]">Target IELTS Band</label>
                      <select 
                        required
                        value={formData.targetBand}
                        onChange={(e) => setFormData({...formData, targetBand: e.target.value})}
                        className="w-full bg-brand-blue-pale border border-hairline rounded-[12px] px-[16px] py-[12px] text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none font-medium text-[15px]"
                      >
                        <option value="" disabled>Select target band</option>
                        {bands.map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold text-body-strong mb-[8px]">Purpose of IELTS</label>
                      <select 
                        required
                        value={formData.purpose}
                        onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                        className="w-full bg-brand-blue-pale border border-hairline rounded-[12px] px-[16px] py-[12px] text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none font-medium text-[15px]"
                      >
                        <option value="" disabled>Select purpose</option>
                        {purposes.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[14px] font-bold text-body-strong mb-[8px]">Country/Region</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-brand-blue-pale border border-hairline rounded-[12px] px-[16px] py-[12px] text-ink focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-[15px]"
                        placeholder="e.g. India"
                      />
                    </div>
                    
                    <label className="flex items-start gap-[12px] mt-[16px] cursor-pointer group">
                      <div className="relative flex items-start pt-1">
                        <input
                           type="checkbox"
                           checked={formData.consent}
                           onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                           className="w-[18px] h-[18px] rounded-[4px] border-hairline text-primary focus:ring-primary"
                        />
                      </div>
                      <span className="text-[14px] text-body group-hover:text-ink transition-colors leading-[1.6]">
                        I'd like to receive personalised IELTS tips, study recommendations, and updates from Learn With Sam and Ash and Kanan.co.
                      </span>
                    </label>

                    <div className="pt-[16px]">
                      <button type="submit" className="w-full bg-primary hover:opacity-90 text-white font-extrabold py-[16px] px-[16px] rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-[16px] shadow-lg shadow-primary/20">
                        <Mail className="w-[20px] h-[20px]" />
                        Get Free Mock Test
                      </button>
                      <p className="text-center text-[13px] text-mute mt-[16px] font-medium">
                        Please use an active email address. Your mock test link will be sent there.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
