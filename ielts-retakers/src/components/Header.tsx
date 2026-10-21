import React from 'react';
import { Phone } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-black/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="ielts-retakers/kanan-logo.svg"
              alt="Kanan"
              className="h-7"
            />
          </div>

          {/* Phone CTA */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <a href="tel:+919228122552" className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-brand transition-colors font-medium">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+91 92281 22552</span>
            </a>
            <a href="tel:+919228122552" className="sm:hidden flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-brand-light text-gray-700 hover:text-brand rounded-full transition-all duration-200">
              <Phone className="w-5 h-5" />
            </a>
            <button className="inline-flex items-center rounded-full px-4 py-2 text-white bg-brand hover:bg-brand-dark transition shadow-pop text-sm font-semibold">Start for FREE</button>
          </div>
      </div>
    </header>
  );
}
