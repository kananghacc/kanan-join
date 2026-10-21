import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { PlayCircle, Shield, Star, CheckCircle2, Youtube } from "lucide-react";

export default function Hero() {
  const assetBase = import.meta.env.BASE_URL;
  const gradientBars = [
    { height: 104, width: 1.1, delay: 0, opacity: 0.7, hue: 8, pulseDepth: 0.12 },
    { height: 86, width: 0.74, delay: 0.16, opacity: 0.48, hue: -4, pulseDepth: 0.08 },
    { height: 96, width: 1.34, delay: 0.32, opacity: 0.78, hue: 12, pulseDepth: 0.16 },
    { height: 74, width: 0.8, delay: 0.48, opacity: 0.5, hue: -8, pulseDepth: 0.1 },
    { height: 92, width: 1.16, delay: 0.64, opacity: 0.7, hue: 6, pulseDepth: 0.14 },
    { height: 66, width: 0.88, delay: 0.8, opacity: 0.42, hue: -10, pulseDepth: 0.08 },
    { height: 82, width: 1.28, delay: 0.96, opacity: 0.62, hue: 14, pulseDepth: 0.13 },
    { height: 58, width: 0.92, delay: 1.12, opacity: 0.38, hue: -2, pulseDepth: 0.07 },
    { height: 72, width: 1.36, delay: 1.28, opacity: 0.56, hue: 9, pulseDepth: 0.1 },
    { height: 60, width: 0.86, delay: 1.44, opacity: 0.4, hue: -6, pulseDepth: 0.08 },
    { height: 84, width: 1.2, delay: 1.6, opacity: 0.64, hue: 13, pulseDepth: 0.13 },
    { height: 70, width: 0.76, delay: 1.76, opacity: 0.46, hue: -8, pulseDepth: 0.09 },
    { height: 94, width: 1.24, delay: 1.92, opacity: 0.74, hue: 7, pulseDepth: 0.15 },
    { height: 78, width: 0.84, delay: 2.08, opacity: 0.52, hue: -4, pulseDepth: 0.09 },
    { height: 102, width: 1.38, delay: 2.24, opacity: 0.8, hue: 15, pulseDepth: 0.16 },
    { height: 88, width: 0.78, delay: 2.4, opacity: 0.5, hue: -7, pulseDepth: 0.1 },
    { height: 108, width: 1.12, delay: 2.56, opacity: 0.72, hue: 10, pulseDepth: 0.12 },
  ];
  const youtubeStats = [
    { value: "2.39M", label: "Subscribers" },
    { value: "76M+", label: "Views" },
    { value: "398", label: "Videos" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-blue pt-[28px] pb-[64px] text-canvas sm:pt-[40px] lg:pt-[44px] lg:pb-[88px]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[50%] bg-[linear-gradient(180deg,#0B3A66_0%,#1B5C93_72%)]"></div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[34%] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70"></div>
      <div className="hero-light-field absolute inset-0 -z-10">
        <div className="hero-gradient-bars">
          {gradientBars.map((bar, index) => (
            <span
              key={index}
              className="hero-gradient-bar"
              style={{
                "--bar-height": `${bar.height}%`,
                "--bar-width": `${bar.width}`,
                "--bar-delay": `${bar.delay}s`,
                "--bar-opacity": bar.opacity,
                "--bar-hue": `${bar.hue}deg`,
                "--bar-pulse-depth": bar.pulseDepth,
              } as CSSProperties}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[920px] flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex w-full flex-col items-center"
          >
            <div className="mb-7 inline-flex rounded-[16px] bg-canvas px-7 py-4 text-[20px] font-extrabold tracking-tight text-brand-blue shadow-[0_22px_70px_rgba(11,58,102,0.3),0_0_42px_rgba(255,58,58,0.16)] sm:px-10 sm:py-5 sm:text-[28px] lg:text-[32px]">
              Free IELTS Mock Test
            </div>

            <div className="mb-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-6 lg:mb-7">
              <div className="flex items-center">
                <span className="text-[26px] font-semibold tracking-tight text-canvas sm:text-[34px]">
                  Learn With Sam and Ash
                </span>
              </div>
            </div>

            <h1 className="mb-5 max-w-[860px] text-[36px] font-extrabold leading-[1.08] tracking-normal text-canvas sm:text-[52px] lg:text-[64px]">
              Get Your IELTS Band Score in <span className="text-primary">2 Hours</span>
            </h1>
            
            <p className="mb-6 max-w-[720px] text-[15px] font-medium leading-[1.55] text-canvas/86 sm:text-[18px] lg:mb-7">
              Join 50,000+ students who've improved with Kanan.co's precise mock tests. Created by Learn With Sam and Ash instructors.
            </p>

            <a
              href="#lead-form"
              className="mb-7 inline-flex w-full items-center justify-center rounded-full bg-primary px-8 py-4 text-[16px] font-extrabold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98] sm:w-auto lg:mb-8"
            >
              Get Free Mock Test
            </a>

            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mb-7 w-full max-w-[760px] lg:max-w-[820px]"
            >
              <div className="relative overflow-hidden rounded-[24px] border border-canvas/30 bg-brand-blue-soft p-4 shadow-2xl shadow-brand-blue/20 sm:p-6 lg:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_22%,rgba(255,255,255,0.64),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(234,243,255,0.78)_48%,rgba(255,247,247,0.78))]"></div>
                <div className="relative z-10 grid items-end gap-5 md:grid-cols-[1.05fr_0.95fr] md:items-start">
                  <div className="relative min-h-[280px] overflow-hidden rounded-[20px] bg-canvas/50 pt-5 sm:min-h-[320px] md:bg-transparent md:pt-0">
                    <div className="absolute inset-x-4 bottom-0 h-[56%] rounded-t-[120px] bg-[linear-gradient(0deg,rgba(11,58,102,0.18),rgba(255,58,58,0.08),transparent)] blur-sm"></div>
                    <img 
                      src={`${assetBase}satendra-hero.png`}
                      alt="Sam - Educator"
                      className="relative z-10 mx-auto h-[300px] w-full max-w-[360px] object-contain object-bottom drop-shadow-[0_22px_35px_rgba(11,58,102,0.3)] sm:h-[340px] md:h-[360px]"
                    />
                  </div>

                  <div className="rounded-[20px] border border-hairline bg-canvas/92 p-5 text-left shadow-xl shadow-brand-blue/10 backdrop-blur sm:p-6">
                    <div className="text-[28px] font-extrabold tracking-tight text-ink sm:text-[34px]">Sam</div>
                    <div className="mt-1 text-[14px] font-medium text-body-strong sm:text-[15px]">Learn With Sam and Ash</div>
                    
                    <div className="mt-5 overflow-hidden rounded-[14px] border border-hairline bg-brand-blue-pale">
                      <div className="flex items-center gap-2 border-b border-hairline bg-canvas px-4 py-3">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[7px] bg-primary">
                          <Youtube className="h-3.5 w-3.5 text-white" strokeWidth={2.4} />
                        </span>
                        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-body">YouTube Channel</span>
                      </div>
                      <div className="grid grid-cols-3 divide-x divide-hairline">
                        {youtubeStats.map((stat) => (
                          <div key={stat.label} className="px-3 py-4 text-center">
                            <div className="text-[18px] font-extrabold text-ink sm:text-[20px]">{stat.value}</div>
                            <div className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-body">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>                  
                </div>
              </div>
            </motion.div>

            <div className="mb-7 grid w-full max-w-[860px] grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex items-center justify-center gap-3 rounded-[12px] border border-canvas/25 bg-canvas/12 px-4 py-3.5 text-[14px] font-semibold text-canvas/88 shadow-sm sm:text-[15px]">
                <PlayCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>Full-length Timed Real Exam Simulation</span>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-[12px] border border-canvas/25 bg-canvas/12 px-4 py-3.5 text-[14px] font-semibold text-canvas/88 shadow-sm sm:text-[15px]">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>Instant & Accurate Band Score</span>
              </div>
              <div className="flex items-center justify-center gap-3 rounded-[12px] border border-canvas/25 bg-canvas/12 px-4 py-3.5 text-[14px] font-semibold text-canvas/88 shadow-sm sm:text-[15px]">
                <Shield className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>100% Free - No Credit Card Required</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-[16px] border border-canvas/25 bg-canvas/12 px-5 py-5 shadow-sm sm:flex-row sm:px-7">
              <div className="flex -space-x-3">
                <img className="h-11 w-11 rounded-full border-2 border-canvas object-cover" src={`${assetBase}students/Dilpreet_a2ddb3d654.png`} alt="Student"/>
                <img className="h-11 w-11 rounded-full border-2 border-canvas object-cover" src={`${assetBase}students/Jaimin_Patel_65b6c293d5.png`} alt="Student"/>
                <img className="h-11 w-11 rounded-full border-2 border-canvas object-cover" src={`${assetBase}students/archie_bansal_0f8bd96465.png`} alt="Student"/>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-canvas bg-primary text-[10px] font-extrabold text-white">14k+</div>
              </div>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex text-primary">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="mt-1 text-[13px] font-semibold text-canvas/78">Tested by 14k+ students</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
