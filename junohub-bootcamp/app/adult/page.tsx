'use client';

import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Linkedin,
  MessageCircle,
  Sparkles,
  Target,
  Workflow,
} from 'lucide-react';

const ASSET_BASE = '/junohub-bootcamp';

const MENTORS = [
  {
    name: 'Shankar Prabhu',
    role: 'Facilitator',
    image: `${ASSET_BASE}/shankar.jpg`,
    linkedin: 'https://www.linkedin.com/in/shankar-prabhu/?isSelfProfile=false',
  },
  {
    name: 'Kanan Shah',
    role: 'Facilitator',
    image: `${ASSET_BASE}/kanan.jpg`,
    linkedin: 'https://www.linkedin.com/in/kanan-m-shah/?isSelfProfile=false',
  },
  {
    name: 'Arth Dharaskar',
    role: 'Facilitator',
    image: `${ASSET_BASE}/arth.jpg`,
    linkedin: 'https://www.linkedin.com/in/arthdh?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    name: 'Mohammed Afsal',
    role: 'Facilitator',
    image: `${ASSET_BASE}/mohammed.jpg`,
    linkedin: 'https://www.linkedin.com/in/mohammed-afsal?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
];

const SPECS = [
  {
    label: 'Baroda',
    value: 'June 19-21',
    note: 'The first in-person cohort for professionals who want a practical AI reset.',
  },
  {
    label: 'Vallabh Vidya Nagar / Anand',
    value: 'June 26-28',
    note: 'The same three-day build sequence, held for the Vallabh Vidya Nagar and Anand region.',
  },
  {
    label: 'Class time',
    value: '10 AM - 5 PM',
    note: 'Full-day working sessions. Bring your laptop and one real work problem to solve.',
  },
  {
    label: 'Early bird',
    value: 'Rs.10,000',
    note: 'Available till June 15. Standard fee is Rs.15,000 per participant.',
  },
];

const OUTCOMES = [
  {
    title: 'AI confidence',
    copy: 'Understand what today’s AI tools can and cannot do, so you stop guessing your way through prompts.',
    icon: Sparkles,
  },
  {
    title: 'A working AI workflow',
    copy: 'Build a repeatable assistant, automation, or internal tool connected to a real professional problem.',
    icon: Workflow,
  },
  {
    title: 'Workplace advantage',
    copy: 'Leave with the vocabulary and output to bring useful AI ideas back to a manager, client, or team.',
    icon: Target,
  },
];

const DAYS = [
  {
    number: '1.0',
    title: 'Foundations for work',
    copy: 'Map where AI fits into your actual responsibilities, then learn prompting patterns for research, writing, planning, analysis, and decisions.',
    bullets: ['Choose one real workplace use case', 'Build a reusable prompt pack', 'Separate useful AI from novelty AI'],
  },
  {
    number: '2.0',
    title: 'Workflows and tools',
    copy: 'Move from manual AI use to repeatable systems. Connect tasks, documents, and no-code or low-code tools into a first working prototype.',
    bullets: ['Turn repetitive work into a workflow', 'Prototype an assistant or internal tool', 'Get facilitator feedback while building'],
  },
  {
    number: '3.0',
    title: 'Polish, present, apply',
    copy: 'Make the prototype explainable and ready to take back to work. Present the result and learn how to communicate its value clearly.',
    bullets: ['Improve the build from peer feedback', 'Present the workplace value', 'Leave with next steps for your role'],
  },
];

const WHATSAPP_MESSAGE =
  'Hi, I’m interested in the AI Bootcamp for working professionals. Can you share details for the Baroda June 19-21 cohort and the Vallabh Vidya Nagar / Anand June 26-28 cohort, including the early bird price?';

export default function LandingPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 520);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleTallyMessage = (event: MessageEvent) => {
      if (typeof event.data === 'string' && event.data.includes('Tally.Form.Submitted')) {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'Tally.Form.Submitted') {
            (window as any).fbq?.('track', 'Lead');
          }
        } catch {
          // Tally sometimes sends non-JSON postMessage payloads.
        }
      }
    };

    window.addEventListener('message', handleTallyMessage);
    return () => window.removeEventListener('message', handleTallyMessage);
  }, []);

  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="hm-page">
      <header className="hm-shell hm-nav">
        <a className="hm-logo" href="#" aria-label="JunoHub home">
          <Image src={`${ASSET_BASE}/junohub-logo-1.png`} alt="JunoHub" width={210} height={60} priority />
        </a>
        <button className="hm-nav__cta" type="button" onClick={scrollToApply}>
          Apply
        </button>
      </header>

      <section className="hm-shell hm-hero">
        <div className="hm-hero__copy hm-reveal" style={{ '--i': 0 } as CSSProperties}>
          <div className="hm-kicker">Two cohorts · three days · 10 AM - 5 PM</div>
          <h1 className="hm-title">
            Be AI-ready before <em>promotion season.</em>
          </h1>
          <p className="hm-lede">
            A three-day in-person bootcamp for working professionals who feel behind on AI,
            want to reduce repetitive work, and need one useful workflow they can take back
            to their team.
          </p>
          <div className="hm-hero__actions">
            <button className="hm-button" type="button" onClick={scrollToApply}>
              Apply for bootcamp <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a className="hm-link-button" href="#curriculum">
              See the 3 days
            </a>
          </div>
        </div>

        <div className="hm-map hm-reveal" style={{ '--i': 1 } as CSSProperties} aria-label="Bootcamp cohort map">
          <div className="hm-map__panel">
            <article className="hm-map__node hm-map__node--baroda">
              <span className="hm-node__meta">Cohort A</span>
              <h2 className="hm-node__title">Baroda</h2>
              <p className="hm-node__copy">June 19-21. A practical AI build sprint for professionals in and around Baroda.</p>
            </article>

            <figure className="hm-map__figure">
              <Image src={`${ASSET_BASE}/hero.png`} alt="Illustrated AI workshop session" width={512} height={512} priority />
            </figure>

            <article className="hm-map__node hm-map__node--anand">
              <span className="hm-node__meta">Cohort B</span>
              <h2 className="hm-node__title">Vallabh Vidya Nagar / Anand</h2>
              <p className="hm-node__copy">June 26-28. Same curriculum, same build outcome, second location.</p>
            </article>

            <article className="hm-map__node hm-map__node--fee">
              <span className="hm-node__meta">Early bird till June 15</span>
              <h2 className="hm-node__title">Rs.10,000</h2>
              <p className="hm-node__copy">Standard fee: Rs.15,000 per participant.</p>
            </article>
          </div>

          <div className="hm-map__legend">
            <div className="hm-legend__item">
              <span className="hm-legend__key">Output</span>
              <span className="hm-legend__value">Working AI workflow or tool</span>
            </div>
            <div className="hm-legend__item">
              <span className="hm-legend__key">Bring</span>
              <span className="hm-legend__value">Laptop and one repetitive task</span>
            </div>
            <div className="hm-legend__item">
              <span className="hm-legend__key">Includes</span>
              <span className="hm-legend__value">Training, feedback, lunch, certificate</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hm-shell hm-band">
        <div className="hm-section-head">
          <h2>Facts before persuasion.</h2>
          <p>
            The offer is intentionally simple: pick the location that works, spend three
            full days building, and leave with an AI system tied to your work.
          </p>
        </div>

        <div className="hm-proof">
          <dl className="hm-spec">
            {SPECS.map((item) => (
              <div className="hm-spec__row" key={item.label}>
                <dt>{item.label}</dt>
                <dd className="hm-spec__value">{item.value}</dd>
                <dd className="hm-spec__note">{item.note}</dd>
              </div>
            ))}
          </dl>

          <div className="hm-outcomes">
            {OUTCOMES.map((outcome) => (
              <article className="hm-outcome" key={outcome.title}>
                <outcome.icon aria-hidden="true" />
                <div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hm-shell hm-band" id="curriculum">
        <div className="hm-section-head">
          <h2>Three days, one useful build.</h2>
          <p>
            The curriculum follows the same path in both locations: understand what AI is
            good for at work, build a repeatable system, then polish and present it.
          </p>
        </div>

        <ol className="hm-days">
          {DAYS.map((day) => (
            <li className="hm-day" key={day.number}>
              <span className="hm-day__num">{day.number}</span>
              <div>
                <h3>{day.title}</h3>
                <p>{day.copy}</p>
                <ul>
                  {day.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="hm-shell hm-band">
        <div className="hm-section-head">
          <h2>Facilitated by builders.</h2>
          <p>
            You work with people who use AI to build products, automate workflows, and solve
            practical business problems.
          </p>
        </div>

        <div className="hm-people">
          {MENTORS.map((mentor) => (
            <article className="hm-person" key={mentor.name}>
              <Image src={mentor.image} alt={mentor.name} width={420} height={560} />
              <div className="hm-person__meta">
                <div>
                  <h3>{mentor.name}</h3>
                  <p>{mentor.role}</p>
                </div>
                <a href={mentor.linkedin} target="_blank" rel="noreferrer" aria-label={`${mentor.name} on LinkedIn`}>
                  <Linkedin size={18} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hm-shell hm-band" id="apply">
        <div className="hm-apply">
          <div className="hm-apply__facts">
            <h2>Ready to make AI useful at work?</h2>
            <div className="hm-price">
              <span className="hm-price__label">Early bird till June 15</span>
              <span className="hm-price__number">Rs.10,000</span>
              <span className="hm-price__note">Standard fee: Rs.15,000 per participant.</span>
            </div>
            <ul className="hm-apply__list">
              <li>Choose Baroda or Vallabh Vidya Nagar / Anand</li>
              <li>Full 3-day immersive AI training from 10 AM to 5 PM</li>
              <li>Hands-on project building with facilitator feedback</li>
              <li>Lunch, refreshments, and certificate of completion</li>
            </ul>
          </div>

          <div className="hm-form">
            <iframe
              suppressHydrationWarning
              data-tally-src="https://tally.so/embed/2EO6eV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&redirectUrl=https://junohub.co/go/payment"
              loading="lazy"
              width="100%"
              height="520"
              title="Working Professional AI Bootcamp Application Form"
            />
          </div>
        </div>
      </section>

      <footer className="hm-footer">
        <div className="hm-shell">
          <p className="hm-footer__line">Bring one task. Leave with one system.</p>
          <div className="hm-footer__meta">
            <Image src={`${ASSET_BASE}/junohub-logo-1.png`} alt="JunoHub" width={180} height={52} />
            <a href="https://www.junohub.co/about" target="_blank" rel="noreferrer">
              About JunoHub
            </a>
            <span>© {new Date().getFullYear()} JunoHub.</span>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/916359427555?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noreferrer"
        className="hm-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} aria-hidden="true" />
      </a>

      {showBackToTop ? (
        <button className="hm-back" type="button" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={22} aria-hidden="true" />
        </button>
      ) : null}

      <aside className="hm-sticky">
        <span className="hm-sticky__text">Early bird Rs.10,000 till June 15. Two locations, three working days.</span>
        <button className="hm-sticky__button" type="button" onClick={scrollToApply}>
          Apply <CheckCircle2 size={17} aria-hidden="true" />
        </button>
      </aside>
    </main>
  );
}
