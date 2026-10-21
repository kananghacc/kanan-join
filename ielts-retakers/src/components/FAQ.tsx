import React, { useState } from 'react';
import { ChevronDownIcon, HelpCircle } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Is this really tailored to me?',
      answer: 'Absolutely. Your plan is built using your specific answers about your target band, timeline, weak sections, and study preferences. We analyze this data to create a customized roadmap designed for your unique situation.'
    },
    {
      question: "What's the catch?",
      answer: 'No catch. Your personalized plan is completely free and comes with actionable next steps. If you later want one-on-one coaching or live classes, you can explore those options—but there\'s zero obligation.'
    },
    {
      question: 'How long does it take to get my plan?',
      answer: 'Your personalized study plan will be emailed to you instantly after you complete the quiz. The entire process takes just 2 minutes from start to finish.'
    },
    {
      question: 'What if I\'m a complete beginner?',
      answer: 'Perfect! Our quiz adapts to all skill levels. Whether you\'ve never taken IELTS or you\'re retaking it, we\'ll create a plan that matches your current abilities and goals.'
    }
  ];

  return (
    <div className="px-8 md:px-12 lg:px-16 py-20 md:py-24 bg-white border-t border-neutral-200/50">
      <div className="max-w-3xl mx-auto">
        {/* Section header - Erik Kennedy: better hierarchy */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-brand" strokeWidth={2} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Common Questions
          </h2>
          <p className="text-lg text-neutral-600">
            Everything you need to know about your personalized plan
          </p>
        </div>

        {/* FAQ items - Erik Kennedy: fewer borders, doubled whitespace */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-soft transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left group"
              >
                {/* Question - Erik Kennedy: make text pop */}
                <span className="font-semibold text-lg text-neutral-900 pr-8 leading-tight">
                  {faq.question}
                </span>

                {/* Icon - Erik Kennedy: light comes from sky (shadow below) */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <ChevronDownIcon className="w-5 h-5 text-brand" strokeWidth={2.5} />
                </div>
              </button>

              {/* Answer - Erik Kennedy: proper line height */}
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-base text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}