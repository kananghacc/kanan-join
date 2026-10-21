import React from 'react';
import { ArrowRightIcon, Sparkles } from 'lucide-react';

export function Hero({
  onStartQuiz
}: {
  onStartQuiz: () => void;
}) {
  return (
    <div className="relative px-8 md:px-12 lg:px-16 pt-0 pb-8 md:pb-12">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/30 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-light text-brand-dark rounded-full text-sm font-bold shadow-sm">
            <Sparkles className="w-4 h-4" />
            Personalized in 2 minutes
          </div>
        </div>

        {/* Hero image with overlaid headline */}
        <div className="mb-12 relative">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=500&fit=crop&q=80"
            alt="Students studying IELTS in modern classroom"
            className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-soft-lg"
          />
          
          {/* Stronger overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 rounded-2xl" />
          
          {/* Overlaid headline with better contrast */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-[1.1] max-w-4xl">
              <span className="text-white drop-shadow-lg">
                Feeling Frustrated That You Keep{' '}
              </span>
              <span className="text-brand-light drop-shadow-lg">
                Missing Your IELTS Target
              </span>
              <span className="text-white drop-shadow-lg">
                {' '}Even Though You Study Hard?
              </span>
            </h1>
          </div>
        </div>

        <p className="text-lg md:text-xl text-neutral-600 mb-6 max-w-3xl mx-auto text-center font-light leading-relaxed">
          Answer 15 questions to discover your study gaps and get a personalized IELTS plan
        </p>

        {/* Value proposition - SOP format with 3 transformation areas */}
        <div className="space-y-6 mb-12 max-w-3xl mx-auto">
          <p className="text-lg md:text-xl text-neutral-700 text-center leading-relaxed font-medium">
            This will help you improve these 3 critical areas:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl shadow-card border border-neutral-200">
              <div className="text-3xl font-bold text-brand mb-2">1</div>
              <h3 className="font-bold text-neutral-900 mb-2">Targeted Weakness Identification</h3>
              <p className="text-sm text-neutral-600">Pinpoint exactly which skills are holding you back from your target band</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-card border border-neutral-200">
              <div className="text-3xl font-bold text-brand mb-2">2</div>
              <h3 className="font-bold text-neutral-900 mb-2">Personalized Study Strategy</h3>
              <p className="text-sm text-neutral-600">Get a custom roadmap that matches your timeline and learning style</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-card border border-neutral-200">
              <div className="text-3xl font-bold text-brand mb-2">3</div>
              <h3 className="font-bold text-neutral-900 mb-2">Proven Band-Score Techniques</h3>
              <p className="text-sm text-neutral-600">Access the exact methods that helped 1000+ students achieve their goals</p>
            </div>
          </div>
        </div>

        {/* Credibility section - SOP format */}
        <div className="bg-white p-8 rounded-2xl shadow-card border border-neutral-200 mb-12 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-light rounded-full mb-6">
              <span className="text-2xl font-bold text-brand">AI</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-3">Created by IELTS Success Experts</h3>
            <p className="text-neutral-600 mb-4 leading-relaxed">
              Our team has helped over <strong className="text-brand">1,000+ students</strong> achieve their target IELTS scores,
              with an average improvement of <strong className="text-brand">1.2 bands</strong> in just 8 weeks.
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-neutral-500">
              <div className="text-center">
                <div className="font-bold text-brand text-lg">95%</div>
                <div>Success Rate</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-brand text-lg">4.9/5</div>
                <div>Student Rating</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-brand text-lg">8 Weeks</div>
                <div>Average Timeline</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA with urgency and reassurance - SOP format */}
        <div className="flex justify-center">
          <button
            onClick={onStartQuiz}
            className="btn-primary-lg group"
          >
            Begin the Quiz — Get Instant Results
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        {/* Trust indicators with reassurance */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-sm text-neutral-500">
            ✅ Quick completion (2 minutes) • ✅ Free access • ✅ Instant results
          </p>
          <p className="text-xs text-neutral-400">
            No credit card required • 1000+ success stories • 95% success rate
          </p>
        </div>
      </div>
    </div>
  );
}