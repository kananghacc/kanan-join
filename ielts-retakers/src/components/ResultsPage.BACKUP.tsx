import { CalendarIcon, DownloadIcon, TargetIcon, TrendingUpIcon, AlertTriangleIcon, CheckCircleIcon, ArrowRightIcon, ClockIcon, BookOpenIcon, UsersIcon, StarIcon, TrophyIcon, Calendar, Video, Sparkles } from 'lucide-react';
import { ProcessedQuizAnswers, generatePDF } from '../utils/pdfGenerator';
interface ResultsPageProps {
  answers: ProcessedQuizAnswers;
  onBack: () => void;
}
export function ResultsPage({
  answers,
  onBack
}: ResultsPageProps) {
  const formatArrayToString = (arr: string[]) => {
    if (arr.length === 0) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return arr.join(' and ');
    return arr.slice(0, -1).join(', ') + ', and ' + arr[arr.length - 1];
  };

  const handleDownloadPDF = () => {
    generatePDF(answers);
  };
  return (
    <div className="w-full min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-white rounded-3xl shadow-soft-xl border border-neutral-200 overflow-hidden">
          {/* Hero Section - Erik Kennedy: Light comes from sky, doubled whitespace */}
          <div className="relative bg-gradient-to-br from-brand via-brand-500 to-brand-600 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-8 py-24 md:py-32 text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full mb-12 shadow-soft-xl">
                <TrophyIcon className="w-20 h-20 text-white" strokeWidth={2} />
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white">
                Your Personalized{' '}
                <span className="bg-gradient-to-r from-amber-100 to-amber-300 bg-clip-text text-transparent">
                  {answers.targetBand}+ Band
                </span>{' '}
                IELTS Study Plan
              </h1>

              <p className="text-2xl md:text-3xl text-white font-light mb-8 max-w-4xl mx-auto leading-relaxed">
                A Roadmap for Success
              </p>

              <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
                Hello! Based on your goals, here is a tailored plan to help you achieve a {answers.targetBand}+ band score.
                We've taken into account that your test is {answers.timeline.toLowerCase()} and you're most concerned about{' '}
                {formatArrayToString(answers.weakSection.map(s => s.toLowerCase()))}. Let's get started.
              </p>
            </div>
          </div>

          <div className="px-8 py-16">
        {/* Page 1: Cover + Introduction */}
        <div className="mb-24">
          <div className="p-12 md:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-2xl mb-6">
                <TargetIcon className="w-8 h-8 text-brand" strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Your Assessment Summary</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Here's what we discovered about your IELTS preparation needs:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-brand-50 to-brand-100 p-8 rounded-2xl border-l-4 border-brand-400">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center">
                    <TargetIcon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Target Band Score</p>
                    <p className="text-3xl font-bold text-neutral-900">{answers.targetBand}+</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 p-8 rounded-2xl border-l-4 border-neutral-400">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-neutral-600 rounded-xl flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Test Timeline</p>
                    <p className="text-3xl font-bold text-neutral-900">{answers.timeline}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-l-4 border-amber-400">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                    <BookOpenIcon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Primary Focus Area{answers.weakSection.length > 1 ? 's' : ''}</p>
                    <p className="text-2xl font-bold text-neutral-900">{formatArrayToString(answers.weakSection)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border-l-4 border-red-400">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <AlertTriangleIcon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-500 uppercase tracking-wide">Main Challenge{answers.obstacle.length > 1 ? 's' : ''}</p>
                    <p className="text-2xl font-bold text-neutral-900">{formatArrayToString(answers.obstacle).toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 2: Diagnostic Summary */}
        <div className="mb-24">
          <div className="p-12 md:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                <TrendingUpIcon className="w-8 h-8 text-blue-600" strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Diagnostic Summary</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Here's a snapshot of your current situation. This is the foundation upon which your personalized plan is built.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-l-4 border-blue-400 mb-8">
              <p className="text-lg text-neutral-700 leading-relaxed">
                <strong>Target Band Score:</strong> {answers.targetBand}+<br />
                <strong>Test Timeline:</strong> {answers.timeline}<br />
                <strong>Primary Focus Area{answers.weakSection.length > 1 ? 's' : ''}:</strong> {formatArrayToString(answers.weakSection)}<br />
                <strong>Previous Experience:</strong> {answers.currentSituation}<br />
                <strong>Daily Study Commitment:</strong> {answers.studyTime}<br />
                <strong>Biggest Obstacle{answers.obstacle.length > 1 ? 's' : ''}:</strong> {formatArrayToString(answers.obstacle).toLowerCase()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-l-4 border-amber-400">
              <p className="text-lg text-neutral-700 leading-relaxed font-medium">
                Acknowledging these points is the first step toward a successful preparation strategy. Your personalized plan will address each of these areas systematically.
              </p>
            </div>
          </div>
        </div>

        {/* Pages 3-4: Custom Study Roadmap - Phase 1 */}
        <div className="mb-24">
          <div className="p-12 md:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
                <CalendarIcon className="w-8 h-8 text-green-600" strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Your Custom Study Roadmap</h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                This roadmap is designed to be realistic and effective, fitting into your daily schedule. Given your aggressive timeline of {answers.timeline.toLowerCase()}, this plan is highly intensive and focused on maximizing your score quickly.
              </p>
            </div>

            {/* Phase 1 */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-brand to-brand-700 text-white p-8 rounded-2xl mb-8">
                <h3 className="text-3xl font-bold mb-4 text-white">Phase 1: Intensive Skill Building & Strategy</h3>
                <p className="text-xl text-white leading-relaxed">
                  Week 1-2 • This phase is all about drilling fundamental skills and mastering essential strategies for your focus areas.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-l-4 border-amber-400 mb-8">
                <h4 className="text-2xl font-bold text-neutral-900 mb-4">Daily Commitment (1-2 hours)</h4>
                <p className="text-lg text-neutral-700 mb-4">
                  Dedicate approximately 60% of your time to Writing, 40% to Reading.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-200">
                  <h4 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                    <BookOpenIcon className="w-8 h-8 text-brand" strokeWidth={2} />
                    Writing (60-70 min)
                  </h4>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Practice one Task 1 (report for Academic, letter for General) and one Task 2 essay daily.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Spend 20-30 minutes specifically on grammar drills. Focus on common errors like subject-verb agreement, tenses, article usage, and complex sentence structures.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Use online grammar quizzes and rewrite sentences to correct errors.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Review official IELTS band descriptors for Task 1 and Task 2.</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-200">
                  <h4 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                    <BookOpenIcon className="w-8 h-8 text-brand" strokeWidth={2} />
                    Reading (40-50 min)
                  </h4>

                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Complete 2-3 Reading passages under timed conditions (aim for 15-17 minutes per passage initially).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Focus on mastering specific question types you find challenging (e.g., True/False/Not Given, Heading Matching).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Learn and practice efficient skimming for main ideas and scanning for specific information.</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-green-400">
                <h4 className="text-2xl font-bold text-neutral-900 mb-6">Weekly Goal (Phase 1)</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="text-neutral-700"><strong>Writing:</strong> Submit at least 3-4 full writing tasks for detailed feedback (if possible). Identify and consistently work on correcting your top 3-5 grammar errors.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="text-neutral-700"><strong>Reading:</strong> Accurately complete 80% of questions in your practice passages. Analyze every incorrect answer to understand the reasoning and where your strategy failed.</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div>
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white p-8 rounded-2xl mb-8">
                <h3 className="text-3xl font-bold mb-4 text-white">Phase 2: Timed Integration & Mock Test Simulation</h3>
                <p className="text-xl text-white leading-relaxed">
                  Week 3-4 • Now, it's about putting everything together under strict time constraints, directly addressing your {answers.obstacle.length > 1 ? 'challenges' : 'challenge'}: {formatArrayToString(answers.obstacle).toLowerCase()}.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-l-4 border-amber-400 mb-8">
                <h4 className="text-2xl font-bold text-neutral-900 mb-4">Daily Commitment (1-2 hours)</h4>
                <p className="text-lg text-neutral-700">
                  Continue intensive practice with strict timing and comprehensive review.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-200">
                  <h4 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                    <BookOpenIcon className="w-7 h-7 text-brand" strokeWidth={2} />
                    Writing (60-70 min)
                  </h4>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Continue daily practice (1 Task 1, 1 Task 2). From day one, time yourself strictly (20 min for Task 1, 40 min for Task 2).</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Focus on producing well-structured, coherent responses within the word limits, applying all learned grammar rules.</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-200">
                  <h4 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                    <BookOpenIcon className="w-7 h-7 text-brand" strokeWidth={2} />
                    Reading (40-50 min)
                  </h4>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Complete one full Reading section (3 passages, 60 minutes) under exam conditions daily.</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">This is crucial for improving your pacing and time management. Practice transferring answers accurately.</p>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-soft border border-neutral-200">
                  <h4 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                    <UsersIcon className="w-7 h-7 text-brand" strokeWidth={2} />
                    General (10-20 min)
                  </h4>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                      <p className="text-neutral-700">Review your vocabulary lists. Briefly review Listening and Speaking tips/strategies.</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-green-400">
                <h4 className="text-2xl font-bold text-neutral-900 mb-6">Weekly Goal (Phase 2)</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="text-neutral-700"><strong>Full Mock Tests:</strong> Take two full-length mock tests (all sections: Listening, Reading, Writing, Speaking) under strict exam conditions. Mimic test day as closely as possible.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="text-neutral-700"><strong>Error Analysis:</strong> Conduct a comprehensive error analysis for all sections of your mock tests. Pinpoint remaining grammar weaknesses, identify where you struggled with time, and adjust your strategies.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <p className="text-neutral-700"><strong>Refinement:</strong> Consolidate notes on common mistakes and essential strategies. Focus on areas where you are still losing points.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Page 5: Why Most Self-Study Plans Fail */}
        <div className="mb-24">
          <div className="p-12 md:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
                <AlertTriangleIcon className="w-8 h-8 text-red-600" strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Why Most Self-Study Plans Fail</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                Many ambitious students struggle to achieve their target band score alone. Here are common pitfalls related to your biggest {answers.obstacle.length > 1 ? 'obstacles' : 'obstacle'}: {formatArrayToString(answers.obstacle).toLowerCase()}.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border-l-4 border-red-400">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Lack of Expert Feedback on Grammar</h3>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  You can't objectively identify and consistently correct your own grammar errors. Without a trained eye, you risk reinforcing incorrect sentence structures, tense usage, or vocabulary choices, making it harder to improve.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border-l-4 border-red-400">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Ineffective Timed Practice</h3>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Simply doing practice tests isn't enough. Without understanding why you're running out of time or how to effectively pace yourself through different question types, especially in Reading and Writing, you won't make significant progress. Generic timers don't provide tailored strategies.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border-l-4 border-red-400">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Generic Materials & No Accountability</h3>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Random online materials don't address your specific gap between your current level and a {answers.targetBand}+ band, particularly concerning your grammar issues. Without accountability, it's easy to lose momentum or deviate from a structured plan, especially with such a short timeline.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page 6: How Our Coaching Accelerates Results */}
        <div className="mb-24">
          <div className="p-12 md:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-6">
                <TrendingUpIcon className="w-8 h-8 text-green-600" strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">How Our Coaching Accelerates Results</h2>
              <p className="text-lg text-neutral-600 leading-relaxed">
                This is where guided preparation makes all the difference. Our program is designed to solve these exact problems.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-green-400">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Expert Feedback on Every Task</h3>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Get detailed, personalized corrections on your writing (grammar, vocabulary, coherence, task achievement) from certified trainers within 24 hours. We pinpoint your specific grammar errors and show you exactly how to fix them.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-green-400">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">Tailored Time Management Strategies</h3>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  Our coaches work with you 1-on-1 to develop precise pacing strategies for Reading and Writing, helping you complete tasks efficiently and accurately under pressure. We analyze your performance to identify where you're losing time and offer targeted solutions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-green-400">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">A Proven, Structured Plan</h3>
                <p className="text-lg text-neutral-700 leading-relaxed">
                  We provide a step-by-step curriculum that is adjusted weekly based on your progress and specific obstacles. You'll always know what to do next, ensuring consistent, focused practice towards your {answers.targetBand}+ band.
                </p>
              </div>
            </div>

            <div className="mt-12 bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-l-4 border-amber-400">
              <div className="flex items-center gap-4 mb-4">
                <StarIcon className="w-8 h-8 text-amber-600" strokeWidth={2} />
                <h3 className="text-2xl font-bold text-neutral-900">Success Story</h3>
              </div>
              <p className="text-lg text-neutral-700 italic leading-relaxed">
                "I went from band 6.5 to 7.5 in just one month with personalized coaching. The feedback on my writing was game-changing!" - Sarah M.
              </p>
            </div>
          </div>
        </div>

        {/* Page 7: Your Immediate Next Step */}
        <div className="mb-24">
          <div className="p-12 md:p-16">
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light rounded-2xl mb-6">
                <ArrowRightIcon className="w-8 h-8 text-brand" strokeWidth={2} />
              </div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-4">Your Immediate Next Step</h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                You have a plan. Now, let's put it into action. The fastest way to close the gap to your {answers.targetBand}+ band score is with personalized guidance, especially with your tight timeline and specific challenges.
              </p>
            </div>

            {/* CTA Cards Section */}
            <div className="mb-12">
              {/* Section header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-light text-brand-dark rounded-full text-sm font-semibold mb-6">
                  <Sparkles className="w-4 h-4" />
                  Limited Spots Available
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
                  Ready to Take the Next Step?
                </h2>
                <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto">
                  Choose how you want to accelerate your IELTS success
                </p>
              </div>

              {/* CTA Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Free Consultation Card */}
                <div className="group relative bg-white rounded-3xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 overflow-hidden border border-neutral-200 hover:border-brand-300 hover:-translate-y-2">
                  {/* Gradient overlay */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-100 to-transparent opacity-50 rounded-full blur-3xl" />

                  <div className="relative p-8 md:p-10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand to-brand rounded-2xl shadow-soft mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold mb-4">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      FREE • NO COMMITMENT
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                      Free Band-Score Consultation
                    </h3>

                    <p className="text-base text-neutral-600 mb-6 leading-relaxed">
                      Get a personalized 15-minute coaching roadmap with our IELTS experts.
                      Discover your fastest path to your {answers.targetBand}+ band.
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {[
                        'Personalized band-gap analysis',
                        'Custom study plan outline',
                        'Expert tips for your weak areas',
                        'Q&A with certified trainers'
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-neutral-700">
                          <div className="flex-shrink-0 w-5 h-5 bg-brand-light rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href="#book-consultation"
                      className="inline-flex items-center gap-3 w-full justify-center px-8 py-4 bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-200 group-hover:gap-4"
                    >
                      Book Your Free Consultation
                      <ArrowRightIcon className="w-5 h-5" strokeWidth={2.5} />
                    </a>

                    {/* Social proof */}
                    <div className="flex items-center gap-2 mt-6 text-xs text-neutral-500">
                      <UsersIcon className="w-4 h-4" />
                      <span>47 people booked this week</span>
                    </div>
                  </div>
                </div>

                {/* Live Masterclass Card */}
                <div className="group relative bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 overflow-hidden border border-neutral-700 hover:border-brand-500 hover:-translate-y-2">
                  {/* Animated gradient overlay */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand/30 to-transparent rounded-full blur-3xl" />

                  <div className="relative p-8 md:p-10">
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-500 to-purple-500 rounded-2xl shadow-soft-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Video className="w-8 h-8 text-white" strokeWidth={2} />
                    </div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold mb-4 border border-amber-400/30">
                      <Sparkles className="w-3 h-3" />
                      NEXT SESSION: TOMORROW 7PM EST
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      Live Masterclass
                    </h3>

                    <p className="text-base text-neutral-300 mb-6 leading-relaxed">
                      "How to Jump 1 Full Band in Just 3 Weeks" — Join 500+ students learning
                      proven strategies from our top trainers.
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {[
                        'Live Q&A with expert trainers',
                        'Insider exam strategies revealed',
                        'Real student success stories',
                        'Bonus study materials included'
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm text-neutral-300">
                          <div className="flex-shrink-0 w-5 h-5 bg-brand-500/20 rounded-full flex items-center justify-center border border-brand-500/30">
                            <svg className="w-3 h-3 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href="#register-masterclass"
                      className="inline-flex items-center gap-3 w-full justify-center px-8 py-4 bg-gradient-to-r from-brand-500 to-purple-500 hover:from-brand hover:to-purple-600 text-white font-semibold rounded-xl shadow-soft-lg hover:shadow-soft-xl transition-all duration-200 group-hover:gap-4"
                    >
                      Reserve Your Spot Now
                      <ArrowRightIcon className="w-5 h-5" strokeWidth={2.5} />
                    </a>

                    {/* Social proof */}
                    <div className="flex items-center gap-2 mt-6 text-xs text-neutral-400">
                      <UsersIcon className="w-4 h-4" />
                      <span>124 people registered today</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom trust indicator */}
              <div className="mt-12 text-center">
                <p className="text-sm text-neutral-500">
                  💯 100% Money-Back Guarantee • 🔒 Secure & Private • ⭐ 4.9/5 from 1000+ Reviews
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8 rounded-2xl border-l-4 border-amber-400 mb-8">
              <h4 className="text-2xl font-bold text-neutral-900 mb-6">While you wait for your consultation:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <p className="text-neutral-700">Start with Phase 1 of your study roadmap</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <p className="text-neutral-700">Focus on the grammar drills and timed practice</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <p className="text-neutral-700">Track your progress daily in a study journal</p>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={handleDownloadPDF}
                className="inline-flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-brand-dark transition-all duration-300 shadow-soft-lg hover:shadow-soft-xl transform hover:scale-105"
              >
                <DownloadIcon className="w-6 h-6" strokeWidth={2} />
                Download PDF Version
              </button>
            </div>
          </div>
        </div>

          {/* Footer */}
          <div className="text-center py-16 border-t border-neutral-200">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-3 text-neutral-600 hover:text-neutral-900 font-medium text-lg transition-colors duration-300"
            >
              <ArrowRightIcon className="w-5 h-5 rotate-180" strokeWidth={2} />
              Back to home
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}