'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronRight, Rocket, Target, Users, Zap, Laptop, Trophy, Calendar, MapPin, Coffee, ArrowUp, Linkedin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const FADE_UP_SPRING = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 15 } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const MENTORS = [
  {
    name: "Shankar Prabhu",
    role: "Facilitator",
    image: "/junohub-bootcamp/shankar.jpg",
    linkedin: "https://www.linkedin.com/in/shankar-prabhu/?isSelfProfile=false"
  },
  {
    name: "Kanan Shah",
    role: "Facilitator",
    image: "/junohub-bootcamp/kanan.jpg",
    linkedin: "https://www.linkedin.com/in/kanan-m-shah/?isSelfProfile=false"
  },
  {
    name: "Arth Dharaskar",
    role: "Facilitator",
    image: "/junohub-bootcamp/arth.jpg",
    linkedin: "https://www.linkedin.com/in/arthdh?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  },
  {
    name: "Mohammed Afsal",
    role: "Facilitator",
    image: "/junohub-bootcamp/mohammed.jpg",
    linkedin: "https://www.linkedin.com/in/mohammed-afsal?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
  }
];

export default function LandingPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleTallyMessage = (event: MessageEvent) => {
      if (typeof event.data === 'string' && event.data.includes('Tally.Form.Submitted')) {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'Tally.Form.Submitted') {
            (window as any).fbq?.('track', 'Lead');
          }
        } catch {
          // ignore parse errors
        }
      }
    };

    window.addEventListener('message', handleTallyMessage);
    return () => window.removeEventListener('message', handleTallyMessage);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-[#FDFCF0] text-[#2D3319] selection:bg-[#E04F26] selection:text-white pb-32">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#FDFCF0]/90 backdrop-blur-md z-50 border-b border-[#2D3319]/10">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/junohub-bootcamp/junohub-logo-1.png" alt="JunoHub" width={210} height={60} className="h-12 w-auto" />
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })} className="font-sans text-sm font-bold uppercase tracking-widest text-[#2D3319] bg-[#EED24E] px-6 py-2.5 rounded-full hover:bg-[#E04F26] hover:text-white transition-colors border border-[#2D3319]">
              Curriculum
            </button>
            <button onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })} className="font-sans text-sm font-bold uppercase tracking-widest text-[#2D3319] bg-[#BEE561] px-6 py-2.5 rounded-full hover:bg-[#E04F26] hover:text-white transition-colors border border-[#2D3319]">
              Apply Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={STAGGER}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-6">
            <motion.div variants={FADE_UP_SPRING} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2D3319] bg-[#EED24E] font-mono text-[#2D3319] text-sm font-bold uppercase">
              <Calendar className="w-4 h-4" />
              <span>May 19-21, 2026 • Vadodara</span>
            </motion.div>

            <motion.h1 variants={FADE_UP_SPRING} className="text-4xl md:text-5xl font-sans font-black tracking-tight leading-[1.05]">
              <span className="text-[#2D3319]">Three-day AI Bootcamp for Teens, </span><span className="text-[#E04F26]">Includes Rs.10,000 Cash Prize</span>
            </motion.h1>

            <motion.p variants={FADE_UP_SPRING} className="text-lg font-mono text-[#2D3319]/80 max-w-lg leading-relaxed">
              Only 15 spots in Vadodara this summer. Taught by startup founders. Your teen will build an AI project to showcase to colleges.
            </motion.p>

            <motion.div variants={FADE_UP_SPRING} className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#E04F26] hover:bg-[#C2411E] text-white px-8 py-4 rounded-full font-sans text-lg font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 border border-[#2D3319]"
              >
                Apply for Bootcamp <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
          
          <motion.div variants={FADE_UP_SPRING} className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#2D3319] border border-[#2D3319] shadow-2xl">
            <Image 
              src="/junohub-bootcamp/hero-image.png" 
              alt="AI Builder Lab Hero"
              fill
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#E04F26]/40 to-transparent flex items-end p-8 flex-col justify-end">
              <div className="bg-[#FDFCF0] border border-[#2D3319] p-6 rounded-2xl w-full">
                <div className="flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-widest text-[#E04F26] mb-2">
                  <Trophy className="w-5 h-5" />
                  <span>Demo Day Prize</span>
                </div>
                <div className="text-2xl font-sans font-black text-[#2D3319] uppercase tracking-tighter">Win ₹10,000 Cash Prize</div>
                <p className="font-mono text-[#2D3319]/70 text-sm mt-2">Awarded to the best AI prototype.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Stats Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-8 border-t border-[#2D3319]/20 grid grid-cols-2 lg:grid-cols-5 gap-6 text-sm font-medium text-[#2D3319]"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#D4DE6E] p-2 rounded-lg border border-[#2D3319]"><Users className="w-5 h-5 text-[#2D3319]" /></div>
            <div>
              <div className="text-[#2D3319] font-sans font-bold uppercase tracking-widest text-xs">15–20 Students</div>
              <div className="font-mono text-xs text-[#2D3319]/70">Intimate Cohort Size</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#C8DE6A] p-2 rounded-lg border border-[#2D3319]"><Target className="w-5 h-5 text-[#2D3319]" /></div>
            <div>
              <div className="text-[#2D3319] font-sans font-bold uppercase tracking-widest text-xs">Classes 9–12</div>
              <div className="font-mono text-xs text-[#2D3319]/70">Ages 14–18</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#B2DE6E] p-2 rounded-lg border border-[#2D3319]"><Calendar className="w-5 h-5 text-[#2D3319]" /></div>
            <div>
              <div className="text-[#2D3319] font-sans font-bold uppercase tracking-widest text-xs">10am–5pm</div>
              <div className="font-mono text-xs text-[#2D3319]/70">May 19-21, 2026</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#EED24E] p-2 rounded-lg border border-[#2D3319]"><Laptop className="w-5 h-5 text-[#2D3319]" /></div>
            <div>
              <div className="text-[#2D3319] font-sans font-bold uppercase tracking-widest text-xs">Bring Your Laptop</div>
              <div className="font-mono text-xs text-[#2D3319]/70">Required to build</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#E04F26]/20 p-2 rounded-lg border border-[#E04F26]"><Coffee className="w-5 h-5 text-[#E04F26]" /></div>
            <div>
              <div className="text-[#E04F26] font-sans font-bold uppercase tracking-widest text-xs">Lunch Provided</div>
              <div className="font-mono text-xs text-[#2D3319]/70">Energized building</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Outcomes Section */}
      <section className="bg-[#2D3319] text-[#FDFCF0] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-sans font-black tracking-tight mb-6 uppercase">What students walk away with.</h2>
            <p className="text-xl font-mono text-[#FDFCF0]/70">Every session is practical, every concept is grounded in real tools. No theory without action.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "AI Fundamentals", desc: "Understand how Language Models work beneath the surface and how to engineer powerful prompts that yield real results.", icon: Zap },
              { title: "Working Prototype", desc: "Go beyond playing with ChatGPT. Connect AI APIs to no-code tools to build a functioning software application.", icon: Rocket },
              { title: "Pitching Confidence", desc: "Learn how to structure a narrative, present clearly, and pitch a technical project to a panel of expert judges.", icon: Target },
            ].map((outcome, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }
                }}
                className="p-8 rounded-3xl border border-[#FDFCF0]/20 bg-[#FDFCF0]/5 hover:bg-[#FDFCF0]/10 transition-colors"
               >
                <div className="w-14 h-14 rounded-full bg-[#E04F26] text-white flex items-center justify-center mb-6 border border-[#FDFCF0]/30 shadow-[4px_4px_0_0_rgba(255,200,0,1)]">
                  <outcome.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-sans font-black tracking-tighter uppercase mb-3 text-[#FFC800]">{outcome.title}</h3>
                <p className="font-mono text-[#FDFCF0]/80 leading-relaxed">{outcome.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculum" className="py-32 px-6 border-b border-[#2D3319]/20 bg-[#F7F6EA]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-6xl md:text-7xl font-sans font-black tracking-tighter mb-6 uppercase leading-[0.85]">
                3 Days<br/>Of <span className="text-[#E04F26]">Building.</span>
              </h2>
              <p className="text-xl font-mono text-[#2D3319]/80 mb-8 max-w-lg">
                We&apos;ve designed a rigorous timeline that takes students right to the finish line. Let&apos;s build.
              </p>
            </div>
            
            <div className="lg:col-span-7 space-y-8">
              {[
                {
                  day: "01",
                  date: "May 19",
                  title: "AI Foundations & Prompt Engineering",
                  time: "9:00 AM - 5:00 PM",
                  focus: "Become a confident AI user by understanding core concepts and ethical boundaries.",
                  highlights: [
                    "Train your first Machine Learning model using Google Teachable Machine",
                    "Master the CLEAR Prompt Framework",
                    "Develop a personal Prompt Template Pack"
                  ],
                  outcome: "You will leave having chosen a real-world problem domain for your final project."
                },
                {
                  day: "02",
                  date: "May 20",
                  title: "No-Code Building & Startup Insights",
                  time: "9:00 AM - 5:00 PM",
                  focus: "Transition from AI user to AI builder by exploring the no-code tool landscape.",
                  highlights: [
                    "Learn from active startup founders (Afsal and Shankar Prabhu) on how they build with AI",
                    "Participate in a focused Build Sprint to develop Working Prototype v1 of your project"
                  ],
                  outcome: "You will receive a mandatory 1:1 check-in with a facilitator for personalized guidance and implement peer feedback (+ / Δ protocol) to improve your prototype."
                },
                {
                  day: "03",
                  date: "May 21",
                  title: "Project Polish & Demo Day",
                  time: "9:00 AM - 5:00 PM",
                  focus: "Finish your project and master the essential skill of communication.",
                  highlights: [
                    "Learn the powerful STAR Pitch Framework",
                    "Design a 4-slide presentation deck",
                    "Rehearse your 90-second pitch a minimum of three times"
                  ],
                  outcome: "You will present your completed AI-powered project to a live panel of judges and receive a personalized certificate."
                },
              ].map((day, i) => (
                <motion.div
                  key={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                  }}
                  className="group"
                >
                  <div className="p-8 md:p-10 bg-[#FDFCF0] rounded-[2rem] border-2 border-[#2D3319] shadow-[8px_8px_0_0_rgba(45,51,25,1)] hover:shadow-[12px_12px_0_0_rgba(224,79,38,1)] hover:-translate-y-1 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                      <span className="font-sans text-5xl font-black text-[#2D3319]/10 group-hover:text-[#FFC800] transition-colors">{day.day}</span>
                      <h3 className="text-3xl font-sans font-black uppercase text-[#2D3319] tracking-tighter">{day.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-block px-3 py-1 rounded-full border border-[#2D3319] bg-[#EED24E] text-[#2D3319] font-mono font-bold text-sm">
                        {day.date}
                      </span>
                      <span className="inline-block px-3 py-1 rounded-full border border-[#E04F26] bg-[#FDFCF0] text-[#E04F26] font-mono font-bold text-sm">
                        {day.time}
                      </span>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="text-xs font-mono font-bold text-[#E04F26] uppercase tracking-wider mb-2">Focus</div>
                        <p className="font-mono text-[#2D3319] text-sm leading-relaxed">{day.focus}</p>
                      </div>

                      <div>
                        <div className="text-xs font-mono font-bold text-[#E04F26] uppercase tracking-wider mb-3">Highlights</div>
                        <ul className="space-y-2">
                          {day.highlights.map((highlight, j) => (
                            <li key={j} className="flex items-start gap-3">
                              <CheckCircle2 className="w-4 h-4 text-[#E04F26] shrink-0 mt-1" />
                              <span className="font-mono text-[#2D3319] text-sm leading-relaxed">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="text-xs font-mono font-bold text-[#E04F26] uppercase tracking-wider mb-2">Outcome</div>
                        <p className="font-mono text-[#2D3319] text-sm leading-relaxed">{day.outcome}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section className="bg-[#FDFCF0] py-32 px-6 border-b border-[#2D3319]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl md:text-6xl font-sans font-black tracking-tighter mb-6 uppercase">Learn from real builders.</h2>
            <p className="text-xl font-mono text-[#2D3319]/70">Our 4 expert facilitators have deep backgrounds in AI, development, and entrepreneurship.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MENTORS.map((mentor, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2rem] bg-[#2D3319] border border-[#2D3319]/20">
                <div className="aspect-[3/4] relative">
                  <Image 
                    src={mentor.image}
                    alt={mentor.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D3319]/95 via-[#2D3319]/40 to-transparent flex flex-col justify-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-xl font-sans font-black uppercase tracking-tighter text-[#FDFCF0]">{mentor.name}</h3>
                        <a href={mentor.linkedin} target="_blank" rel="noreferrer" className="text-[#FDFCF0]/50 hover:text-[#0A66C2] transition-all opacity-0 group-hover:opacity-100">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-[#FFC800] font-mono text-xs uppercase tracking-wider font-bold">{mentor.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Fee & Lead Form */}
      <section id="apply" className="py-32 px-6 bg-[#FDFBEA]">
        <div className="max-w-7xl mx-auto bg-[#2D3319] rounded-[3rem] overflow-hidden shadow-2xl relative border-2 border-[#2D3319]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E04F26]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 border-none pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 relative z-10">
            {/* Pricing Details */}
            <div className="p-12 md:p-20 text-[#FDFCF0] flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#FDFCF0]/10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FDFCF0]/20 bg-[#FDFCF0]/5 text-[#FDFCF0]/80 font-mono text-sm font-bold uppercase mb-8 w-fit">
                <MapPin className="w-4 h-4" />
                Vadodara Cohort
              </div>
              
              <h2 className="text-4xl md:text-5xl font-sans font-black uppercase tracking-tighter mb-6">Secure Your Spot</h2>
              <p className="font-mono text-[#FDFCF0]/70 text-lg mb-12">Spots are strictly limited to 10–15 students to ensure personalized mentorship.</p>
              
              <div className="mb-12">
                <div className="text-[#FFC800] font-mono text-sm font-bold uppercase tracking-widest mb-4">Course Fee</div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl md:text-7xl font-sans font-black tracking-tighter">₹5,999</span>
                  <span className="text-xl font-mono text-[#FDFCF0]/50">/ student</span>
                </div>
                <div className="flex items-center gap-3 mt-4 px-4 py-3 bg-[#E04F26]/10 border border-[#E04F26]/20 rounded-xl text-[#E04F26]">
                  <Trophy className="w-6 h-6 shrink-0 text-[#E04F26]" />
                  <p className="text-base font-mono font-bold leading-tight">Demo Day Winner receives a <strong className="text-white block mt-0.5">₹10,000 Cash Prize</strong></p>
                </div>
              </div>

              <ul className="space-y-4">
                {[
                  "Full 3-Day immersive technical training",
                  "Lunch and refreshments provided daily",
                  "Direct access to 4 expert facilitators",
                  "Certificate of completion"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3" id={`benefit-${i}`}>
                    <CheckCircle2 className="w-5 h-5 text-[#FFC800] shrink-0" />
                    <span className="font-mono text-[#FDFCF0]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Application Form */}
            <div className="p-12 md:p-16 bg-[#2D3319]/80 backdrop-blur-xl">
              <iframe suppressHydrationWarning data-tally-src="https://tally.so/embed/2EO6eV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&redirectUrl=https://junohub.co/go/payment" loading="lazy" width="100%" height="500" title="Lead Application Form" className="border-0"></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 bg-gradient-to-br from-[#4A7D4E] to-[#2B543D] text-[#FDFCF0]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center">
              <Image src="/junohub-bootcamp/junohub-logo-1.png" alt="JunoHub" width={240} height={72} className="h-16 w-auto brightness-0 invert" />
            </div>
            <div className="text-[#FDFCF0]/80 font-mono text-sm max-w-sm text-center md:text-left">
              From raw idea to investor ready in record time. The Startup Blueprint Platform.
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6 font-mono font-bold text-sm text-[#FDFCF0]/90">
              <a href="https://www.junohub.co/about" target="_blank" rel="noreferrer" className="hover:text-[#FFC800] transition-colors">About JunoHub</a>
            </div>
            <div className="font-mono text-[#FDFCF0]/50 text-xs">
              © {new Date().getFullYear()} JunoHub. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/916359427555?text=${encodeURIComponent("Hi, I'm interested in the AI Bootcamp. Can you share the complete details ?")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 left-8 p-3 bg-[#25D366] border border-[#2D3319] text-white rounded-full shadow-[4px_4px_0_0_rgba(45,51,25,1)] hover:bg-[#20BD5A] hover:shadow-[6px_6px_0_0_rgba(45,51,25,1)] transition-all z-50 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </a>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-[#EED24E] border border-[#2D3319] text-[#2D3319] rounded-full shadow-[4px_4px_0_0_rgba(45,51,25,1)] hover:bg-[#FFC800] hover:shadow-[6px_6px_0_0_rgba(45,51,25,1)] transition-all z-50 group focus:outline-none"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  );
}
