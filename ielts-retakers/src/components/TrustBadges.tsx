import React from 'react';
import { UsersIcon, AwardIcon, TrendingUpIcon } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: UsersIcon,
      number: '1,000+',
      text: 'Success stories'
    },
    {
      icon: AwardIcon,
      number: '100%',
      text: 'Certified IELTS trainers'
    },
    {
      icon: TrendingUpIcon,
      number: '3-4 weeks',
      text: 'Average time to results'
    }
  ];

  return (
    <div className="px-8 md:px-12 lg:px-16 py-16 bg-gradient-to-b from-white to-neutral-50/50 border-t border-neutral-200/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              {/* Icon container with subtle animation */}
              <div className="mb-4 p-4 bg-brand-50 rounded-2xl group-hover:bg-brand-light transition-colors duration-300">
                <badge.icon className="w-8 h-8 text-brand" strokeWidth={1.5} />
              </div>

              {/* Number/stat */}
              <div className="text-3xl font-bold text-neutral-900 mb-2">
                {badge.number}
              </div>

              {/* Description */}
              <p className="text-neutral-600 font-medium text-sm">
                {badge.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}