import React from 'react';
import { MessageCircleIcon, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <div className="px-8 md:px-12 lg:px-16 py-16 md:py-20 border-t border-neutral-200/50 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-3xl mx-auto text-center">
        {/* Icon - Erik Kennedy: use color purposefully */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-2xl mb-6">
          <MessageCircleIcon className="w-8 h-8 text-brand" strokeWidth={2} />
        </div>

        {/* Heading - Erik Kennedy: better hierarchy */}
        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
          Need Urgent Improvement?
        </h3>

        {/* Description - Erik Kennedy: proper line height */}
        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
          Our IELTS experts are ready to help you achieve your target band score faster
        </p>

        {/* CTA button - Erik Kennedy: light comes from sky */}
        <button className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-brand text-brand hover:bg-brand hover:text-white font-semibold rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-200 group">
          <MessageCircleIcon className="w-5 h-5" strokeWidth={2.5} />
          Chat with an IELTS Expert Now
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
        </button>

        {/* Small print - Erik Kennedy: make less important text "un-pop" */}
        <p className="text-sm text-neutral-500 mt-8">
          Available Monday - Friday, 9am - 6pm EST
        </p>
      </div>
    </div>
  );
}