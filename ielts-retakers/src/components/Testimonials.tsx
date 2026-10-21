import React from 'react';
import { StarIcon, Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote: "Absolutely worthwhile! Their exceptional coaching enabled me to achieve Band 7.0 in IELTS.",
      name: "Suriya Senthilkumar",
      result: "Band 7.0",
      image: "/ielts-retakers/testimonial-images/suriya_senthilkumar_ielts_review_7dfca668c9.png"
    },
    {
      quote: "Exceptional training! Achieved Band 7.5 overall with a perfect 9.0 in Reading.",
      name: "Anees Basha",
      result: "Band 7.5",
      image: "/ielts-retakers/testimonial-images/anees_basha_ielts_review_fd739179d4.png"
    },
    {
      quote: "Great learning experience! The mock tests and KYS helped me enhance my skills. Highly recommended!",
      name: "Prachi Saxena",
      result: "Band 7.0",
      image: "/ielts-retakers/testimonial-images/prachi_sexana_e01739ed20.png"
    },
    {
      quote: "Fantastic online lectures! Faculty thoroughly knows what they're teaching. Band 8.5 achieved!",
      name: "Joshi",
      result: "Band 8.5",
      image: "/ielts-retakers/testimonial-images/joshi-ielts.png"
    },
    {
      quote: "Best decision ever! Study materials were incredibly helpful. Achieved Band 8.5!",
      name: "Divya Sharma",
      result: "Band 8.5",
      image: "/ielts-retakers/testimonial-images/divya_sharma_f6fea895e5.png"
    },
    {
      quote: "Excellent guidance and support! The structured approach helped me achieve my target score.",
      name: "Dr. Kruti Dussing",
      result: "Band 8.5",
      image: "/ielts-retakers/testimonial-images/kruti_dusingh_d4c02822e0.png"
    }
  ];

  return (
    <div className="px-8 md:px-12 lg:px-16 py-20 md:py-24 bg-gradient-to-b from-white to-neutral-50 border-t border-neutral-200/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header - Erik Kennedy: better hierarchy */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            IELTS Success Stories
          </h2>
          <p className="text-lg text-neutral-600">
            Real students who achieved their target IELTS scores with our coaching
          </p>
        </div>

        {/* Testimonials grid - Erik Kennedy: doubled whitespace, fewer borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white p-8 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300"
            >
              {/* Quote icon - Erik Kennedy: use color purposefully */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-md">
                  <Quote className="w-5 h-5 text-white" fill="currentColor" />
                </div>
              </div>

              {/* Stars - Erik Kennedy: light comes from sky (positioned at top) */}
              <div className="flex gap-1 mb-6 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote - Erik Kennedy: proper line height */}
              <p className="text-base text-neutral-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author - Erik Kennedy: make text pop with contrast */}
              <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover shadow-sm"
                />
                <div>
                  <p className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm font-medium text-brand">
                    {testimonial.result}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}