import React, { useState } from 'react';
import { MailIcon, UserIcon, Sparkles, Lock, Phone } from 'lucide-react';

interface EmailCaptureProps {
  onSubmit: (email: string, name: string, phone: string) => void;
}

export function EmailCapture({ onSubmit }: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && phone) {
      onSubmit(email, name, phone);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      {/* Header - Erik Kennedy: better hierarchy, doubled whitespace */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl shadow-soft-lg mx-auto mb-6">
          <Sparkles className="w-10 h-10 text-white" strokeWidth={2} />
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
          Get Your Personalized Study Plan
        </h3>

        <p className="text-lg text-neutral-600 leading-relaxed">
          Enter your details to receive your personalized study plan{' '}
          <span className="font-semibold text-neutral-900">instantly via email</span>.
        </p>
      </div>

      {/* Form - Erik Kennedy: fewer borders, better spacing */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <UserIcon className="w-5 h-5 text-neutral-400" strokeWidth={2} />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah Johnson"
              required
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl text-base
                       focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100
                       transition-all duration-200 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <MailIcon className="w-5 h-5 text-neutral-400" strokeWidth={2} />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              required
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl text-base
                       focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100
                       transition-all duration-200 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Phone input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Phone className="w-5 h-5 text-neutral-400" strokeWidth={2} />
            </div>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98400 33336"
              required
              className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-xl text-base
                       focus:bg-white focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100
                       transition-all duration-200 placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Submit button - Erik Kennedy: light comes from sky */}
        <button
          type="submit"
          className="w-full btn-primary-lg mt-8 shadow-soft-lg"
        >
          <Sparkles className="w-5 h-5" />
          Send Me My Custom Plan
        </button>

        {/* Privacy note - Erik Kennedy: make less important text "un-pop" */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <Lock className="w-4 h-4 text-neutral-400" />
          <p className="text-sm text-neutral-500">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </form>
    </div>
  );
}