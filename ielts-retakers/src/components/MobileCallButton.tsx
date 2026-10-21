import React from 'react';
import { Phone } from 'lucide-react';

export function MobileCallButton() {
  return (
    <a
      href="tel:+919840033336"
      className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-6 py-3 bg-brand hover:bg-brand-dark text-white rounded-full shadow-pop hover:shadow-lg transition-all duration-200 font-semibold"
      aria-label="Call us"
    >
      <Phone className="w-5 h-5" />
      <span>Call Now</span>
    </a>
  );
}
