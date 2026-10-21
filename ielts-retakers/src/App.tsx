import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Quiz } from './components/Quiz';
import { TrustBadges } from './components/TrustBadges';
import { Explainer } from './components/Explainer';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileCallButton } from './components/MobileCallButton';

export function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return (
      <>
        <Header />
        <div className="pt-16 md:pt-20">
          <Quiz onBack={() => setShowQuiz(false)} />
        </div>
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-neutral-50 pt-16 md:pt-20">
        <div className="max-w-6xl mx-auto px-4 pt-0 pb-8 md:pb-16">
          <div className="bg-white rounded-3xl shadow-soft-xl border border-neutral-200 overflow-hidden">
            <Hero onStartQuiz={() => setShowQuiz(true)} />
            <TrustBadges />
            <Explainer />
            <HowItWorks onStartQuiz={() => setShowQuiz(true)} />
            <Testimonials />
            <FAQ />
            <Footer />
          </div>
        </div>
      </div>
      <WhatsAppButton />
      <MobileCallButton />
    </>
  );
}