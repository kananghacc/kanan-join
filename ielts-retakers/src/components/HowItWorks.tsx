import React from 'react';
import { ClipboardListIcon, MailIcon, CheckCircleIcon, ArrowRight } from 'lucide-react';

export function HowItWorks({
  onStartQuiz
}: {
  onStartQuiz: () => void;
}) {
  const steps = [
    {
      icon: ClipboardListIcon,
      title: 'Answer 6 quick questions',
      description: 'About your goals, pain points, and timeline.'
    },
    {
      icon: MailIcon,
      title: 'Get your personalized PDF roadmap',
      description: 'Delivered instantly by email.'
    },
    {
      icon: CheckCircleIcon,
      title: 'Discover your fastest route',
      description: 'Plus actionable tips and a free checklist.'
    }
  ];

  return (
    <div className="px-8 md:px-12 lg:px-16 py-20 bg-white border-t border-neutral-200/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Three simple steps to your personalized IELTS study plan
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector arrow (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-full z-0">
                  <ArrowRight className="w-6 h-6 text-neutral-300" />
                </div>
              )}

              {/* Step card */}
              <div className="relative bg-white p-8 rounded-2xl border border-neutral-200 hover:border-brand-200 transition-all duration-300 hover:shadow-soft">
                {/* Step number */}
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-brand to-brand text-white rounded-xl text-xl font-bold mb-6 shadow-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <step.icon className="w-10 h-10 text-brand" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-xl text-neutral-900 mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onStartQuiz}
            className="btn-primary-lg group"
          >
            Take the Quiz — Unlock My IELTS Strategy
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}