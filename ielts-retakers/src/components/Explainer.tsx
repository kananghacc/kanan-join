import React from 'react';
import { AlertCircle } from 'lucide-react';

export function Explainer() {
  return (
    <div className="px-8 md:px-12 lg:px-16 py-20 md:py-24 border-t border-neutral-200/50">
      <div className="max-w-3xl mx-auto text-center">
        {/* Icon accent - Erik Kennedy: use color purposefully */}
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-8">
          <AlertCircle className="w-8 h-8 text-amber-600" strokeWidth={2} />
        </div>

        {/* Heading - Erik Kennedy: better typography hierarchy, more contrast */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
          Stop Wasting Time on{' '}
          <span className="text-neutral-500">Generic Prep Strategies</span>
        </h2>

        {/* Body - Erik Kennedy: proper line height (1.7), doubled whitespace */}
        <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
          Most self-studiers plateau because their plan is{' '}
          <strong className="font-semibold text-neutral-900">not tailored to their actual weaknesses</strong>.
          {' '}Our 2-minute quiz reveals your unique IELTS profile and sends a study plan
          proven to close your "band gap" fast.
        </p>
      </div>
    </div>
  );
}