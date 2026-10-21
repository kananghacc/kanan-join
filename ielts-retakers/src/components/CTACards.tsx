import React from 'react';
import { Calendar, Video, ArrowRight, Sparkles, Users } from 'lucide-react';

export function CTACards() {
  return (
    <div className="px-8 md:px-12 lg:px-16 py-20 md:py-24 bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-light text-brand-dark rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Limited Spots Available
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
            Choose how you want to accelerate your IELTS success
          </p>
        </div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Free Consultation Card */}
          <div className="group relative bg-white rounded-3xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 overflow-hidden border border-neutral-200 hover:border-brand-300 hover:-translate-y-2">
            {/* Gradient overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-100 to-transparent opacity-50 rounded-full blur-3xl" />

            <div className="relative p-8 md:p-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand to-brand rounded-2xl shadow-soft mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-white" strokeWidth={2} />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mb-4">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                FREE • NO COMMITMENT
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                Free Band-Score Consultation
              </h3>

              <p className="text-base text-neutral-600 mb-6 leading-relaxed">
                Get a personalized 15-minute coaching roadmap with our IELTS experts.
                Discover your fastest path to your target band.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {[
                  'Personalized band-gap analysis',
                  'Custom study plan outline',
                  'Expert tips for your weak areas',
                  'Q&A with certified trainers'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-neutral-700">
                    <div className="flex-shrink-0 w-5 h-5 bg-brand-light rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#book-consultation"
                className="inline-flex items-center gap-3 w-full justify-center px-8 py-4 bg-brand hover:bg-brand-dark text-white font-semibold rounded-full shadow-pop hover:shadow-lg transition-all duration-200 group-hover:gap-4"
              >
                Book Your Free Consultation
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </a>

              {/* Social proof */}
              <div className="flex items-center gap-2 mt-6 text-xs text-neutral-500">
                <Users className="w-4 h-4" />
                <span>47 people booked this week</span>
              </div>
            </div>
          </div>

          {/* Live Masterclass Card */}
          <div className="group relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 overflow-hidden border border-neutral-700 hover:border-brand-500 hover:-translate-y-2">
            {/* Animated gradient overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand/30 to-transparent rounded-full blur-3xl" />

            <div className="relative p-8 md:p-10">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-500 to-purple-500 rounded-2xl shadow-soft-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-8 h-8 text-white" strokeWidth={2} />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold mb-4 border border-amber-400/30">
                <Sparkles className="w-3 h-3" />
                NEXT SESSION: TOMORROW 7PM EST
              </div>

              {/* Content */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Live Masterclass
              </h3>

              <p className="text-base text-neutral-300 mb-6 leading-relaxed">
                "How to Jump 1 Full Band in Just 3 Weeks" — Join 500+ students learning
                proven strategies from our top trainers.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {[
                  'Live Q&A with expert trainers',
                  'Insider exam strategies revealed',
                  'Real student success stories',
                  'Bonus study materials included'
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-neutral-300">
                    <div className="flex-shrink-0 w-5 h-5 bg-brand-500/20 rounded-full flex items-center justify-center border border-brand-500/30">
                      <svg className="w-3 h-3 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="#register-masterclass"
                className="inline-flex items-center gap-3 w-full justify-center px-8 py-4 bg-gradient-to-r from-brand-500 to-purple-500 hover:from-brand hover:to-purple-600 text-white font-semibold rounded-full shadow-pop hover:shadow-lg transition-all duration-200 group-hover:gap-4"
              >
                Reserve Your Spot Now
                <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
              </a>

              {/* Social proof */}
              <div className="flex items-center gap-2 mt-6 text-xs text-neutral-400">
                <Users className="w-4 h-4" />
                <span>124 people registered today</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom trust indicator */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500">
            💯 100% Money-Back Guarantee • 🔒 Secure & Private • ⭐ 4.9/5 from 1000+ Reviews
          </p>
        </div>
      </div>
    </div>
  );
}
