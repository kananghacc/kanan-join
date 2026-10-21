import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import AuthorityStrip from './components/AuthorityStrip';
import ProblemSection from './components/ProblemSection';
import IELTSImportance from './components/IELTSImportance';
import Benefits from './components/Benefits';
import WhoIsThisFor from './components/WhoIsThisFor';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import LeadForm from './components/LeadForm';
import FAQs from './components/FAQs';
import FinalCTA from './components/FinalCTA';
import ThankYou from './components/ThankYou';
import StickyMobileCTA from './components/StickyMobileCTA';

export default function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo(0, 0);
    }
  }, [isSubmitted]);

  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-primary selection:text-canvas">
      {isSubmitted ? (
        <ThankYou />
      ) : (
        <main>
          <Hero />
          <ProblemSection />
          <IELTSImportance />
          <Benefits />
          <WhoIsThisFor />
          <Testimonials />
          <HowItWorks />
          <div id="lead-form">
            <LeadForm onSubmit={() => setIsSubmitted(true)} />
          </div>
          <FAQs />
          <FinalCTA />
          <StickyMobileCTA />
        </main>
      )}
    </div>
  );
}
