import { motion } from "motion/react";
import { Mail, Clock, CheckCircle } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen pt-[128px] pb-[96px] flex flex-col relative overflow-hidden bg-canvas">
      
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-canvas-soft border border-hairline rounded-[4px] p-[32px] md:p-[64px] text-center"
        >
          {/* Animated decorative ring */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
            className="w-[80px] h-[80px] bg-canvas border border-hairline rounded-full flex items-center justify-center mx-auto mb-[32px] relative"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-2 -right-2 bg-primary w-[32px] h-[32px] rounded-full flex items-center justify-center border-[4px] border-canvas-soft"
            >
              <CheckCircle className="w-[16px] h-[16px] text-canvas" />
            </motion.div>
            <Mail className="w-[32px] h-[32px] text-primary" />
          </motion.div>

          <h1 className="text-[32px] md:text-[48px] font-normal tracking-[-1.2px] mb-[24px] leading-[1.1] text-ink">
            Check your inbox for your <br className="hidden md:block"/> IELTS mock test link.
          </h1>
          
          <p className="text-[18px] text-body-strong mb-[48px]">
            We've sent your free mock test access link to your email.
          </p>
          
          <div className="bg-canvas border border-hairline rounded-[4px] p-[32px] text-left mb-[48px] inline-block w-full max-w-xl">
            <h3 className="text-[18px] font-medium mb-[24px] text-ink">
              What to do next
            </h3>
            
            <ol className="space-y-[24px]">
              <li className="flex gap-[16px]">
                <div className="w-[32px] h-[32px] rounded-full bg-canvas-soft border border-hairline flex items-center justify-center shrink-0 font-mono text-[14px] text-mute mt-[2px]">1</div>
                <div>
                  <div className="text-ink font-medium mb-[4px] text-[16px]">Open the email</div>
                  <div className="text-body text-[14px]">Look for an email from Learn With Sam and Ash / Kanan.co</div>
                </div>
              </li>
              <li className="flex gap-[16px]">
                <div className="w-[32px] h-[32px] rounded-full bg-canvas-soft border border-hairline flex items-center justify-center shrink-0 font-mono text-[14px] text-mute mt-[2px]">2</div>
                <div>
                  <div className="text-ink font-medium mb-[4px] text-[16px]">Click your test access link</div>
                  <div className="text-body text-[14px]">Follow the link to our secure testing platform</div>
                </div>
              </li>
              <li className="flex gap-[16px]">
                <div className="w-[32px] h-[32px] rounded-full bg-canvas-soft border border-hairline flex items-center justify-center shrink-0 font-mono text-[14px] text-mute mt-[2px]">3</div>
                <div>
                  <div className="text-ink font-medium mb-[4px] text-[16px] flex items-center gap-[8px]">
                    Complete the timed test
                    <Clock className="w-[14px] h-[14px] text-primary" />
                  </div>
                  <div className="text-body text-[14px]">Experience the real IELTS constraints</div>
                </div>
              </li>
              <li className="flex gap-[16px]">
                <div className="w-[32px] h-[32px] rounded-full bg-canvas border border-primary text-primary flex items-center justify-center shrink-0 font-mono text-[14px] mt-[2px]">4</div>
                <div>
                  <div className="text-primary font-medium mb-[4px] text-[16px]">Get your score instantly</div>
                  <div className="text-primary text-[14px] opacity-80">Receive detailed feedback upon completion</div>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="text-[14px] text-mute bg-canvas border border-hairline py-[12px] px-[24px] rounded-[3px] inline-flex items-center justify-center gap-[8px]">
            <span className="font-medium text-body-strong">Didn't receive the email?</span>
            Check your spam, promotions, or updates folder.
          </div>
          
        </motion.div>
      </div>
    </div>
  );
}
